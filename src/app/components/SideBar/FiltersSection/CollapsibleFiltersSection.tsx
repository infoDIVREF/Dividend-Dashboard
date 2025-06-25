"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  id: string;
  title: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

export default function CollapsibleFilterSection({
  title,
  isOpen,
  onToggle,
  children,
}: Props) {
  return (
    <div className="flex flex-col border-b border-gris">
      <div className="flex items-center justify-between py-2 px-1 ">
        <div className="text-[15px] text-base font-bricolage font-bold">
          {title}
        </div>
        <button
          onClick={onToggle}
          className="text-sm text-gray-500 hover:text-gray-800"
        >
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className=" flex-1 max-h-[20vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
