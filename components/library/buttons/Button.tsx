import React from "react";
import Icons from "../Icons";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  icon?: string;
  stretch?: boolean;
};

const Button = ({ onClick, icon, children, stretch }: Props) => {
  return (
    <div
      className={`flex justify-center gap-3 ${
        stretch ? "w-full" : "w-fit"
      } h-fit py-lg px-[60px] rounded-xl bg-primary text-white cursor-pointer`}
      onClick={onClick}
    >
      {icon && (
        <div className="relative h-8">
          <Icons color="white" icon={icon} />
        </div>
      )}
      <p className="text-lg font-medium pt-1">{children}</p>
    </div>
  );
};

export default Button;
