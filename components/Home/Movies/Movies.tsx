"use client";
import Movie from "./Movie";
import useSwr from "@/lib/utils/useSwr";
import { Movie as MovieType } from "@/types";

interface MoviesProps {
  genere: number;
  title: string;
}

const Movies = ({ genere, title }: MoviesProps) => {
  const {
    data: movies,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSwr<MovieType[]>(
    "trending/movie/day",
    `sort_by=popularity.desc&with_genres=${genere}`
  );

  // console.log(isLoading);
  // console.log(data);
  return <div className="text-white">{/* <Movie movie={movies[0]} /> */} hello</div>;
};

export default Movies;
