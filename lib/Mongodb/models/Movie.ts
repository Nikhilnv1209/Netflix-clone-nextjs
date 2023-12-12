import mongoose, { Schema, model, InferSchemaType, Types } from "mongoose";

const MovieSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String },
  thumbnailUrl: { type: String },
  genre: { type: String },
  duration: { type: String },
});

type TMovie = InferSchemaType<typeof MovieSchema>;

export type TMovieDocument = TMovie & {
  id: Types.ObjectId;
  save: () => Promise<TMovie>;
};

export const Movie =
  mongoose.models.Movie || model<TMovieDocument>("Movie", MovieSchema);
