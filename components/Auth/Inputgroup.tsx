import React from "react";

interface InputProps {
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  type?: string;
  value: string;
}

const Inputgroup: React.FC<InputProps> = ({ id, onChange, label, type, value}) => {
  return (
    <>
      <div className="block relative">
        <input
          type={type}
          id={id}
          onChange={onChange}
          value={value}
          className="
        w-full 
        px-4
        text-white 
        text-md 
        bg-neutral-700 
        pt-6 
        pb-2 
        rounded-md 
        focus:outline-none
        peer 
        focus:ring-0
        "
          placeholder=" "
          autoComplete="off"
        />
        <label
          className="
        absolute
        left-4 
        top-3
        transform
        duration-150
        -translate-y-2
        scale-75
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:-translate-y-2
        peer-focus:scale-75
        origin-[0]
        text-gray-400
        "
        htmlFor={id}
        >
          {label}
        </label>
      </div>
    </>
  );
};

export default Inputgroup;
