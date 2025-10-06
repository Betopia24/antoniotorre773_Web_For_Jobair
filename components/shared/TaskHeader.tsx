import React from "react";

interface TaskHeaderProps {
  title: string;
  description: string;
  taskNumber: number;
}

const TaskHeader = ({ title, description, taskNumber }: TaskHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-0">
        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-gray-300">{description}</p>
      </div>
      <span className="flex items-center justify-center text-sm border border-gray-500 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full px-4 py-1.5">
        Task {taskNumber}
      </span>
    </div>
  );
};

export default TaskHeader;
