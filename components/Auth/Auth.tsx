"use client";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import Inputgroup from "./Inputgroup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const Auth = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [variant, setVariant] = useState<"login" | "register">("login");

  const router = useRouter();

  // const { data: session } = useSession();
  // console.log("in auth client component",session);

  const toggleVariant = useCallback(() => {
    setVariant((currentvariant) =>
      currentvariant === "login" ? "register" : "login"
    );
  }, []);

  const login = async () => {
    const toastid = toast.loading("logging in...");
    try {
      const res = await signIn("Credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/profiles",
      });
      if (res && res.error) {
        throw new Error(res.error);
      }
      toast.success("Logged in successfully", { id: toastid });
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err) {
      console.log(err);
      if (err) {
        toast.error((err as Error).message, { id: toastid });
      }
    }
  };

  const register = async () => {
    const toastid = toast.loading("Registering...");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ name: username, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      toast.success("Registered successfully", { id: toastid });
      setVariant("login");
    } catch (error: unknown) {
      console.log(error);
      if (error) {
        toast.error((error as Error).message, { id: toastid });
      }
    }
  };

  return (
    <div className="h-screen bg-black bg-opacity-50 bg-center bg-cover md:bg-hero">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "15px",
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
          }, 
        }}
      />
      <div className="h-full bg-black md:bg-opacity-50">
        <nav className="px-10 py-4 md:px-16 md:py-6">
          <Image
            src={"/images/logo.png"}
            width={120}
            height={120}
            alt="navbar logo"
          />
        </nav>
        <section className="flex justify-center w-full">
          <div className="bg-black/80 self-center rounded-xl w-full md:w-[450px] md:max-w-[450px] md:px-12 md:py-16 px-6 py-12">
            <h1 className="mb-6 text-2xl font-semibold text-white md:text-3xl">
              {variant === "login" ? "Sign In" : "Sign Up"}
            </h1>
            <div className="flex flex-col w-full gap-4">
              {variant === "register" && (
                <Inputgroup
                  id="username"
                  label="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  value={username}
                />
              )}
              <Inputgroup
                id="email"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
              />
              <Inputgroup
                id="password"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
              />
            </div>
            <div className="mt-10">
              <button
                className="w-full py-3 text-lg text-white transition duration-150 bg-red-700 rounded-md hover:bg-red-600"
                onClick={variant === "login" ? login : register}
              >
                {variant === "login" ? "Login" : "Sign Up"}
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                className="flex items-center justify-center w-10 h-10 transition duration-150 bg-white rounded-full hover:cursor-pointer"
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
              >
                <FcGoogle size={30} />
              </button>
              <div
                className="z-10 flex items-center justify-center w-10 h-10 transition duration-150 bg-white rounded-full hover:cursor-pointer"
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
              >
                <FaGithub size={30} color="black"/>
              </div>
            </div>

            <div>
              <p className="mt-6 text-center text-gray-400">
                {variant === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <span
                  className="text-white transition duration-150 hover:underline hover:cursor-pointer "
                  onClick={toggleVariant}
                >
                  {variant === "login" ? "Create an account" : "Sign in now."}
                </span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
