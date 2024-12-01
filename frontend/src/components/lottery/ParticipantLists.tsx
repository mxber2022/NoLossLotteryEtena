import { motion, AnimatePresence } from "framer-motion";
import { formatAmount } from "../../utils/format";

interface Participant {
  address: string;
  deposit: string;
}

interface ParticipantsListProps {
  isOpen: boolean;
  onClose: () => void;
  participants: Participant[];
}

export function ParticipantsList({
  isOpen,
  onClose,
  participants,
}: ParticipantsListProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Current Participants
              </h2>
              <p className="text-gray-600 mt-1">
                Total participants: {participants.length}
              </p>
            </div>

            <div className="overflow-y-auto max-h-[60vh]">
              <div className="p-6 space-y-4">
                {participants.map((participant, index) => (
                  <motion.div
                    key={participant.address}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 font-mono">
                            {participant.address}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          {formatAmount(participant.deposit)} USDe
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-100">
              <button
                onClick={onClose}
                className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
