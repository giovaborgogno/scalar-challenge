import Button, { ButtonProps } from "@/shared/Button/Button";
import React from "react";

export interface FloatingButtonProps extends ButtonProps {}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  className = "",
  ...args
}) => {
  return (
    <div className="fixed bottom-0 right-0 p-5 z-40 ">
    <Button
      className={`h-[50px] w-[200px] items-center justify-center rounded-full bg-green-500 text-white border-none ${className}`}
      {...args}
    />
    </div>
  );
};

export default FloatingButton;