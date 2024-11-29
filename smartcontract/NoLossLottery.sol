// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import OpenZeppelin Contracts
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Interfaces for USDe and sUSDe
interface IUSDe is IERC20 {}

interface IsUSDe is IERC20 {
    function deposit(uint256 amount, address recipient) external;
    function cooldownShares(uint256 shares) external;
    function unstake(address recipient) external;
    function convertToAssets(uint256 shares) external view returns (uint256);
    function convertToShares(uint256 assets) external view returns (uint256);
    function cooldownDuration() external view returns (uint256);
}

contract NoLossLottery is ReentrancyGuard {
    using SafeERC20 for IUSDe;
    using SafeERC20 for IsUSDe;

    // Tokens
    IUSDe public immutable usdeToken;
    IsUSDe public immutable susdeToken;

    // Lottery Parameters
    uint256 public enrollmentStart;
    uint256 public enrollmentEnd;
    uint256 public drawInterval = 7 days;
    uint256 public lastDrawTime;
    uint256 public constant MIN_DEPOSIT_AMOUNT = 1 * 1e18; // Example: 100 USDe with 18 decimals

    // Participant Data
    address[] public participants;
    mapping(address => bool) public isParticipant;

    // User Balances
    mapping(address => uint256) public userDeposits;
    mapping(address => uint256) public userSusdeBalances;

    // Total Deposits
    uint256 public totalDeposits;
    uint256 public totalSusdeBalance;

    // Withdrawal Requests
    struct WithdrawalRequest {
        uint256 susdeAmount;
        uint256 cooldownStart;
    }

    mapping(address => WithdrawalRequest) public withdrawalRequests;

    // Prize Withdrawal Data
    WithdrawalRequest public prizeWithdrawal;
    address public prizeWinner;

    // Events
    event EnrollmentStarted(uint256 startTime, uint256 endTime);
    event DepositMade(address indexed user, uint256 amount);
    event WithdrawalInitiated(address indexed user, uint256 susdeAmount);
    event WithdrawalCompleted(address indexed user, uint256 usdeAmount);
    event PrizeDistributed(address indexed winner, uint256 amount);

    constructor(
        address _usdeAddress,
        address _susdeAddress
    ) {
        require(_usdeAddress != address(0), "Invalid USDe address");
        require(_susdeAddress != address(0), "Invalid sUSDe address");


        usdeToken = IUSDe(_usdeAddress);
        susdeToken = IsUSDe(_susdeAddress);

        lastDrawTime = block.timestamp;
    }

    // Modifier to check enrollment period
    modifier onlyDuringEnrollment() {
        require(
        block.timestamp >= enrollmentStart && block.timestamp <= enrollmentEnd,
        "Enrollment period is not active"
        );
        _;
    }

    // Owner starts the enrollment period
    function startEnrollment(uint256 _enrollmentDuration) public {
    require(_enrollmentDuration > 0, "Duration must be greater than zero");


    enrollmentStart = block.timestamp;
    enrollmentEnd = block.timestamp + _enrollmentDuration;

    // Reset participants for the new round
    for (uint256 i = 0; i < participants.length; i++) {
        isParticipant[participants[i]] = false;
    }
    delete participants;

    lastDrawTime = block.timestamp;

    emit EnrollmentStarted(enrollmentStart, enrollmentEnd);
    }

// Users deposit USDe to join the lottery
    function deposit(uint256 amount) external nonReentrant onlyDuringEnrollment {
        require(amount >= MIN_DEPOSIT_AMOUNT, "Deposit below minimum amount");


        // Transfer USDe from user to contract
        usdeToken.safeTransferFrom(msg.sender, address(this), amount);

        // Approve sUSDe contract to spend USDe
        usdeToken.approve(address(susdeToken), amount);

        // Stake USDe to receive sUSDe
        uint256 initialSusdeBalance = susdeToken.balanceOf(address(this));
        susdeToken.deposit(amount, address(this));
        uint256 newSusdeBalance = susdeToken.balanceOf(address(this));
        uint256 susdeReceived = newSusdeBalance - initialSusdeBalance;

        // Update user balances
        userSusdeBalances[msg.sender] += susdeReceived;
        userDeposits[msg.sender] += amount;
        totalSusdeBalance += susdeReceived;
        totalDeposits += amount;

        // Add user to participants if not already present
        if (!isParticipant[msg.sender]) {
            participants.push(msg.sender);
            isParticipant[msg.sender] = true;
        }

        emit DepositMade(msg.sender, amount);
    }

    function getParticipantsAndDeposits() external view returns (address[] memory addresses, uint256[] memory deposits) {
        uint256 count = participants.length;
        addresses = new address[](count);
        deposits = new uint256[](count);
        
        for (uint256 i = 0; i < count; i++) {
            addresses[i] = participants[i];
            deposits[i] = userDeposits[participants[i]];
        }
        
        return (addresses, deposits);
    }
    
    function getParticipantsCount() external view returns (uint256) {
        return participants.length;
    }


// Users initiate withdrawal of their deposit
function initiateWithdrawal() external nonReentrant {
uint256 susdeAmount = userSusdeBalances[msg.sender];
require(susdeAmount > 0, "No balance to withdraw");


// Update user balances
userSusdeBalances[msg.sender] = 0;
uint256 usdeAmount = susdeToken.convertToAssets(susdeAmount);
userDeposits[msg.sender] = 0;
totalSusdeBalance -= susdeAmount;
totalDeposits -= usdeAmount;

// Remove user from participants
isParticipant[msg.sender] = false;
// Note: Removing from the participants array is gas-intensive and not implemented here

// Initiate cooldown
susdeToken.cooldownShares(susdeAmount);

// Record the withdrawal request
withdrawalRequests[msg.sender] = WithdrawalRequest({
    susdeAmount: susdeAmount,
    cooldownStart: block.timestamp
});

emit WithdrawalInitiated(msg.sender, susdeAmount);
}

// Users complete withdrawal after cooldown
function completeWithdrawal() external nonReentrant {
WithdrawalRequest storage request = withdrawalRequests[msg.sender];
require(request.susdeAmount > 0, "No pending withdrawal");


uint256 cooldownDuration = susdeToken.cooldownDuration();
require(
    block.timestamp >= request.cooldownStart + cooldownDuration,
    "Cooldown period not over"
);

// Unstake sUSDe tokens
susdeToken.unstake(address(this));

// Calculate the amount of USDe to transfer
uint256 usdeAmount = susdeToken.convertToAssets(request.susdeAmount);

// Transfer USDe to the user
usdeToken.safeTransfer(msg.sender, usdeAmount);

// Clear the withdrawal request
delete withdrawalRequests[msg.sender];

emit WithdrawalCompleted(msg.sender, usdeAmount);
}

// Calculate total interest earned
function calculateTotalInterest() public view returns (uint256) {
uint256 totalAssets = susdeToken.convertToAssets(totalSusdeBalance);
uint256 interestEarned = totalAssets - totalDeposits;
return interestEarned;
}

// Owner triggers prize distribution
function distributePrize() external {
require(
block.timestamp >= enrollmentEnd,
"Enrollment period is still active"
);
require(participants.length > 0, "No participants to select from");


uint256 interestEarned = calculateTotalInterest();
require(interestEarned > 0, "No interest earned to distribute");

// Generate a pseudo-random number (NOT SECURE)
// WARNING: This method is insecure and can be manipulated.
uint256 randomHash = uint256(
    keccak256(
        abi.encodePacked(
            blockhash(block.number - 1),
            block.timestamp,
            block.difficulty,
            address(this)
        )
    )
);

// Select a random winner
uint256 winnerIndex = randomHash % participants.length;
address winner = participants[winnerIndex];

// Initiate cooldown for the interest amount
uint256 interestInShares = susdeToken.convertToShares(interestEarned);
susdeToken.cooldownShares(interestInShares);

// Record the prize withdrawal request
prizeWithdrawal = WithdrawalRequest({
    susdeAmount: interestInShares,
    cooldownStart: block.timestamp
});
prizeWinner = winner;

emit PrizeDistributed(winner, interestEarned);
}

// Complete prize withdrawal after cooldown
function completePrizeWithdrawal() external nonReentrant {
require(prizeWithdrawal.susdeAmount > 0, "No pending prize withdrawal");
uint256 cooldownDuration = susdeToken.cooldownDuration();
require(
block.timestamp >= prizeWithdrawal.cooldownStart + cooldownDuration,
"Cooldown period not over"
);


// Unstake sUSDe tokens
susdeToken.unstake(address(this));

// Calculate the amount of USDe to transfer
uint256 usdeAmount = susdeToken.convertToAssets(prizeWithdrawal.susdeAmount);

// Transfer USDe to the winner
usdeToken.safeTransfer(prizeWinner, usdeAmount);

// Clear the prize withdrawal request
delete prizeWithdrawal;
prizeWinner = address(0);
}

// Fallback functions to receive ETH (if necessary)
receive() external payable {}

fallback() external payable {}
}