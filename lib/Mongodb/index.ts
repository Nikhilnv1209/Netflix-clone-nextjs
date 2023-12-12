import mongoose, { ConnectOptions } from "mongoose";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const Mongo_uri: string | undefined = process.env.DATABASE_URL;

const MongooseDBconnect = async () => {
  const db = await mongoose.connect(
    Mongo_uri as string,
    options as ConnectOptions
  );

  // console.log(`MongoDB connected: ${db.connection.host}`);
  // console.log(mongoose.connections);

  return db;
};

export default MongooseDBconnect;
