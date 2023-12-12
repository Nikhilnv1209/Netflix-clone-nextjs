"use client";
import useSWR from "swr";

const BaseUrl = "https://api.themoviedb.org/3";
const apiKey = process.env.NEXT_PUBLIC_TBDB_API_KEY as string;

const fetcher = async (url: string) => {
  const res = await fetch(`${BaseUrl}/${url}`, {
    next: {
      revalidate: 1200,
    },
  });
  const data = await res.json();
  return data;
};

export default function useSwr<T>(endpoint: string, params?: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `${endpoint}?api_key=${apiKey}&${params}}`,
    fetcher
  );
  return { data, error, isLoading, isValidating, mutate };
}

// const url = '/?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=36';
