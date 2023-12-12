"use client";
import Image from "next/image";
import NavbarItems from "./NavbarItems";
import Netflix from "@/public/images/Netflix";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import { useEffect, useState } from "react";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showbackground, setShowbackground] = useState(false);

  const handlemobilemenu = () => {
    setShow((prev) => !prev);
    if (showAccountMenu) setShowAccountMenu(false);
  };

  const handleAccountMenu = () => {
    setShowAccountMenu((prev) => !prev);
    if (show) setShow(false);
  };


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > TOP_OFFSET) {
        setShowbackground(true);
      } else {
        setShowbackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 z-40 w-full">
      <div
        className={`px-6 md:px-10 py-3 
          flex items-center
          transition duration-500
        ${showbackground ? "bg-gray-900" : ""}
        `}
      >
        <Image
          alt="Netflix logo"
          src={"/images/logo.png"}
          width={150}
          height={50}
          className="hidden object-contain w-20 h-8 md:block md:h-10 md:w-32 md:object-fill"
        />
        {/* mobile image */}
        <div className="w-8 md:hidden">
          <Netflix />
        </div>

        {/* Big screen links */}
        <div className="md:flex hidden items-center gap-4 text-[15px] lg:space-x-6 lg:text-[17px] ml-12">
          <NavbarItems label={"Home"} />
          <NavbarItems label={"Series"} />
          <NavbarItems label={"Films"} />
          <NavbarItems label={"New & Popular"} />
          <NavbarItems label={"My list"} />
          <NavbarItems label={"Browse by languages"} />
        </div>

        {/* mobile */}
        <div
          className="flex items-center justify-center px-6 md:hidden"
          onClick={handlemobilemenu}
        >
          <div className="relative transition">
            Browse
            <BsChevronDown
              className={`inline-block ml-2 transition hover:cursor-pointer
              ${show ? "rotate-180" : "rotate-0"}
              `}
            />
            <MobileMenu visible={show} />
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-4 ml-auto">
          <div className="text-gray-200 cursor-pointer hover:text-gray-300">
            <BsSearch />
          </div>
          <div className="text-gray-200 cursor-pointer hover:text-gray-300">
            <BsBell />
          </div>
          <div
            className="relative flex items-center gap-2 hover:cursor-pointer"
            onClick={handleAccountMenu}
          >
            <Image
              src={"/images/profile-blue.png"}
              width={40}
              height={40}
              alt="profile image"
              className="rounded max-md:w-10 max-md:h-10"
            />
            <BsChevronDown
              className={`${
                showAccountMenu ? "rotate-180" : "rotate-0"
              } transition duration-150 text-gray-200 hover:text-gray-300 cursor-pointer
              min-w-[20px]
              `}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
