import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TUserDocument } from "@/lib/Mongodb/models/User";

type sessionProps = {
  user: TUserDocument;
};

const Appsession = async () => {
  const session: sessionProps | null = await getServerSession(authOptions);
  if (!session) return null;
  return session;
};

export default Appsession;
