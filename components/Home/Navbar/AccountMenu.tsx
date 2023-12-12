"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useMemo } from "react";
interface AccountMenuProps {
  visible: boolean;
}
const AccountMenu = ({ visible }: AccountMenuProps) => {
  const { data: session, status } = useSession();

  const name = useMemo(() => {
    if (status === "loading") return "loading...";
    return session?.user?.name;
  }, [session, status]);

  const handlesignout = () => {
    signOut({
      callbackUrl: "http://localhost:3000/auth",
      redirect: true,
    });
  };

  if (!visible) return null;

  return (
    <div className="absolute top-14 right-0 md:w-[16rem] w-[12rem] bg-black rounded">
      <div className="flex flex-col">
        <div className="flex items-center group gap-5 px-2 py-2 w-full transition duration-500">
          <Image
            src={"/images/profile-blue.png"}
            width={30}
            height={30}
            className="rounded-md group-hover:border group-hover:border-gray-600"
            alt="profile picture"
          />
          <p className="capitalize text-sm text-gray-200 group-hover:text-gray-300">
            {name}
          </p>
        </div>
        <hr className="bg-gray-600 h-px w-[95%] mx-auto" />
        <button className="py-2 text-sm" onClick={handlesignout}>
          Sign out of Netflix
        </button>
      </div>
    </div>
  );
};

export default AccountMenu;
