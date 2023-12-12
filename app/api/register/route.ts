import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import MongooseDBconnect from "@/lib/Mongodb";
import User from "@/lib/Mongodb/models/User";
import { MongooseError } from "mongoose";

export async function POST(req: NextRequest) {
  // connect to the database
  const mongoose = await MongooseDBconnect();
  mongoose.connection.on("error", (error) =>
    console.log("in regitser post route", error)
  );
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password)
      throw new Error("Missing required fields");

    // check if the user already exists
    const existinguser = await User.findOne({ email: email });
    if (existinguser) throw new Error("User already exists");

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create the user
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // disconnect from the database
    await mongoose.disconnect();

    // return the user object
    return NextResponse.json({ user: user }, { status: 201 });
  } catch (error: unknown) {
    console.log(error);
    const Error = error as MongooseError;
    return NextResponse.json(
      { error: Error.stack?.split("+")[0] },
      { status: 500 }
    );
  }
}
