import Appsession from "@/lib/utils/session";
import Image from "next/image";
import Link from "next/link";

const Profile = async () => {
  const session = await Appsession();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center w-[60%] max-w-[300px] min-w-[260px] md:max-w-[500px] ">
        <h1 className="text-3xl text-white md:text-5xl">Who is watching?</h1>
        <div className="mt-8">
          <Link href={"/"}>
            <div className="group">
              <div
                className="w-40 h-40 transition duration-200 border-2 border-transparent rounded-md md:h-52 md:w-52 group-hover:border-white group-hover:cursor-pointer"
              >
                <Image
                  src={"/images/profile-blue.png"}
                  width={220}
                  height={220}
                  className="rounded-md"
                  alt="profile"
                />
              </div>
              <div
                className="mt-2 text-sm text-center text-gray-200 md:text-lg group-hover:text-white"
              >
                <p>{session?.user?.name}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
