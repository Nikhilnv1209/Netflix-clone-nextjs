"use client";
import { Movie as MovieType } from "@/types";
import React from "react";
import Image from "next/image";

interface MovieProps {
  movie: MovieType;
}

const Movie = ({ movie }: MovieProps) => {
  // console.log(error);
  return (
    <div className="min-w-[20rem]">
      <Image
        src={`https://image.tmdb.org/t/p/original${
          movie.backdrop_path || movie.poster_path
        }`}
        alt="banner"
        width={1920}
        height={1080}
        className="self-center object-cover h-full duration-150 ease lg:h-full opacity-80 hover:opacity-100"
        
      />
    </div>
  );
};

export default Movie;
