import React from "react";

interface MobileMenuProps {
  visible: boolean;
}

const MobileMenu = ({ visible }: MobileMenuProps) => {
  if (!visible) return null;

  return (
    <div className="bg-black w-[12rem] absolute text-sm text-center top-8 left-0 flex flex-col border border-gray-800 items-center justify-center gap-2 rounded-md py-3
    [&>div]:hover:underline
    ">
      <div className="w-full py-1">
        Home
      </div>
      <div className="w-full py-1">
        Series
      </div>
      <div className="w-full py-1">
        Films
      </div>
      <div className="w-full py-1">
        New & Popular
      </div>
      <div className="w-full py-1">
        My list
      </div>
      <div className="w-full py-1">
        Browse by Languages
      </div>
      {/* <div className="">
        Hello
      </div>
      <div className="">
        Hello
      </div> */}
    </div>
  );
};

export default MobileMenu;
