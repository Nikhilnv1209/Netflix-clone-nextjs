import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import MongooseDBconnect from "@/lib/Mongodb";
import User, { TUserDocument } from "@/lib/Mongodb/models/User";
import bcrypt from "bcrypt";
import { NextAuthOptions, RequestInternal } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import MongoDBconnect from "@/lib/Mongodb/Nextauth";
import { JWT } from "next-auth/jwt";
import jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || " ",
      clientSecret: process.env.GITHUB_SECRET || " ",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || " ",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || " ",
    }),
    Credentials({
      id: "Credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // define the authorize function with types
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
        req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
      ) {
        // connect to the database
        await MongooseDBconnect();
        if (!credentials)
          throw new Error("Required credentials were not provided");

        // check for the user in the database
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("User not found");

        // console.log("in nextauth line 29", user);
        // check if the password is correct
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) throw new Error("Invalid password");

        // return the user object
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  //   debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
    // You can define your own encode/decode functions for signing and encryption
    async encode({ token }): Promise<string> {
      const encodedToken = jwt.sign(
        token as JWT,
        process.env.NEXTAUTH_JWT_SECRET as string
      );
      return encodedToken;
    },
    async decode({ token }): Promise<JWT | null> {
      // console.log("in nextauth line 60", "token:", token);
      const decodedtoken = jwt.verify(
        token as string,
        process.env.NEXTAUTH_JWT_SECRET as string
      );
      return decodedtoken as JWT;
    },
  },

  adapter: MongoDBAdapter(MongoDBconnect(), {
    collections: {
      Sessions: "sessions",
      Accounts: "accounts",
      Users: "users",
      VerificationTokens: "verificationtokens",
    },
    databaseName: "Netflix",
  }),

  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      user && (token.user = user);
      // console.log("in nextauth line 66", "trigger:", trigger);
      // console.log("in nextauth line 66", "token:", token, "user:", user, "trigger:", trigger, "session:", session);
      if (trigger === "update" && session?.user) {
        token.user = session.user;
      }
      return token;
    },

    session: async ({ session, token, trigger }) => {
      // console.log("in nextauth line 71", "trigger:", trigger, "newSession:", newSession, "user:", user, "session:", session, "token:", token);
      const user = token.user as TUserDocument;
      session.user = user;
      // console.log("in nextauth line 73", "session:", session, "token:", token);
      return session;
    },

    signIn: async ({ user, account, profile }) => {
      // console.log( //   "in nextauth line 79", 
      //"user:",
      //   user,
      //   "account:",
      //   account,
      //   "profile:",
      //   profile
      // );
      const client = await MongooseDBconnect();
      // const db = client.connection.db.databaseName;
      const usercollection = client.connection.db.collection("users");
      const accountscollection = client.connection.db.collection("accounts");
      if (account?.provider === "google" || account?.provider === "github") {
        const userInUsersCollection = await usercollection.findOne(
          { email: user?.email },
          { projection: { _id: 1 } }
        );
        const userInAccountsCollection = await accountscollection.findOne(
          { provider: account?.provider, userId: userInUsersCollection?._id },
          { projection: { _id: 1 } }
        );

        console.log("in nextauth line 93", profile);
        if (!userInUsersCollection) {
          const createduser = await usercollection.insertOne({
            name: profile?.name,
            email: profile?.email,
            image:
              // @ts-ignore
              account?.provider === "google"
                ? profile?.picture
                : profile?.avatar_url,
            createdAt: new Date(),
            updatedAt: new Date(),
            emailverified: null,
            FavoriteIds: [],
          });

          await accountscollection.insertOne({
            ...account,
            userId: createduser.insertedId,
          });

          return true;
        }

        if (userInUsersCollection && !userInAccountsCollection) {
          await accountscollection.insertOne({
            ...account,
            userId: userInUsersCollection._id,
          });

          await usercollection.updateOne(
            { _id: userInUsersCollection._id },
            {
              $set: {
                // @ts-ignore
                image:
                  account?.provider === "google"
                    ? profile?.picture
                    : profile?.avatar_url,
              },
            }
          );
          return true;
        }

        if (userInAccountsCollection || userInUsersCollection) {
          await usercollection.updateOne(
            { _id: userInUsersCollection._id },
            {
              $set: {
                // @ts-ignore
                image:
                  account?.provider === "google"
                    ? profile?.picture
                    : profile?.avatar_url,
              },
            }
          );
          return true;
        }
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
