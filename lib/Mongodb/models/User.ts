import mongoose, { Schema, model, InferSchemaType, Types } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, default: null },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  emailverified: { type: Date, default: null },
  FavoriteIds: [{ type: Types.ObjectId }],
});

type TUser = InferSchemaType<typeof userSchema>;

export type TUserDocument = TUser & {
  _id: Types.ObjectId;
  save: () => Promise<TUser>;
};

const User = mongoose.models.User || model<TUserDocument>("User", userSchema);

export default User;
