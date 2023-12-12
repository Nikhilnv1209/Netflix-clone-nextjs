"use client";
import { IconType } from "react-icons";
interface ButtonProps {
  text: string;
  icon: any;
  className: string;
  onClick?: () => void;
}

export default function Button({
  text,
  icon,
  className,
  onClick,
}: ButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      {text}
      {icon}
    </button>
  );
}
