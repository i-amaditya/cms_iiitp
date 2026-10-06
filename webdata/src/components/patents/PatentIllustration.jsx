import React from "react";
import {
  BrainCircuit,
  Network,
  Leaf,
  ShieldCheck,
} from "lucide-react";

const PatentIllustration = ({ type }) => {
  const renderIcon = () => {
    switch (type) {
      case "Granted":
        return <BrainCircuit size={54} strokeWidth={1.7} />;

      case "Published":
        return <Network size={54} strokeWidth={1.7} />;

      case "Filed":
        return <Leaf size={54} strokeWidth={1.7} />;

      default:
        return <ShieldCheck size={54} strokeWidth={1.7} />;
    }
  };

  return (
    <div className="relative h-24 w-24">
      <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl opacity-70"></div>
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-sky-100 shadow-sm dark:border-gray-700 dark:from-gray-800 dark:via-gray-800 dark:to-gray-700">
        <div className="text-primary">{renderIcon()}</div>
      </div>
    </div>
  );
};

export default PatentIllustration;