import fetcher from "@/lib/utils/fetcher";
import { Movie as MovieType } from "@/types";
import React from "react";
import Movie from "./Movie";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface BannerMovie {
  results: MovieType[];
}

const Trending = async () => {
  const { results: movies }: BannerMovie = await fetcher("/trending/movie/day");
  // console.log(movies);
  return (
    <div className="flex flex-col gap-4 px-6 py-2">
      <h1 className="text-2xl">Trending</h1>
      <div className="flex h-full gap-2 overflow-x-scroll realtive max-w-screen group">
        <BsChevronLeft className="absolute top-0 left-0 object-contain w-10 h-10" />
        {movies.map((movie) => (
          <Movie movie={movie} />
        ))}
        <BsChevronRight className="absolute top-0 right-0 object-contain w-10 h-10" />
      </div>
    </div>
  );
};

export default Trending;
