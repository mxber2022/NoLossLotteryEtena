import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { StatCard } from "./StatCard";
import { formatAmount } from "../../utils/format";
import { LotteryState } from "../../types/lottery";
import { useState } from "react";
import { ParticipantsList } from "./ParticipantLists";

interface Props {
  stats: LotteryState;
}

export function LotteryStats({ stats }: Props) {
  const [showParticipants, setShowParticipants] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6"
      >
        <StatCard
          title="Total Deposits"
          value={`${formatAmount(stats.totalDeposits)} USDe`}
          icon="💰"
        />
        <StatCard
          title="Prize Pool"
          // value={`${formatAmount(stats.prizePool)} USDe`}
          value={`17 %`}
          icon="🏆"
        />
        {/* <StatCard
        title="Total Participants"
        value={stats.totalParticipants.toString()}
        icon="👥"
      /> */}

        <div
          onClick={() => setShowParticipants(true)}
          className="cursor-pointer"
        >
          <StatCard
            title="Total Participants"
            value={stats.totalParticipants.toString()}
            icon="👥"
          />
        </div>
        <StatCard
          title="Enrollment Ends"
          value={formatDistanceToNow(stats.enrollmentEnd * 1000, {
            addSuffix: true,
          })}
          icon="⏳"
        />
      </motion.div>

      <ParticipantsList
        isOpen={showParticipants}
        onClose={() => setShowParticipants(false)}
        participants={stats.participants || []}
      />
    </>
  );
}
