import React from "react";
import fetcher, { imageUrl } from "@/lib/utils/fetcher";
import { Movie } from "@/types";
import Image from "next/image";
import { FaInfoCircle, FaPlay } from "react-icons/fa";
import Button from "@/components/Button";

interface BannerMovie {
  results: Movie[];
}

const Banner = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const { results: movies }: BannerMovie = await fetcher("/discover/movie");
  const random = Math.floor(Math.random() * movies.length - 1);
  // console.log(movies[random]);
  return (
    <div className="relative">
      <Image
        src={`${imageUrl}${
          movies[random]?.backdrop_path || movies[random]?.poster_path
        }`}
        alt="banner"
        width={1920}
        height={1080}
        className="self-center object-cover w-full h-screen lg:h-full opacity-80"
      />
      <div
        className="absolute top-[15%] md:top-[25%] left-6 z-10 min-w-[200px] w-[40%]
        flex flex-col gap-3 py-2
        "
      >
        <h1 className="font-bold lg:text-4xl md:text-2xl">
          {movies[random]?.title ||
            movies[random]?.name ||
            movies[random]?.original_title}
        </h1>
        <p className="text-xs font-normal md:text-base lg:text-lg ">
          {movies[random]?.overview}
        </p>
        <div className="flex gap-3 xl:mt-3">
          <Button
            key={"playbutton"}
            className="bg-white bannerButton"
            text="Play"
            icon={<FaPlay size={20} />}
          />
          <Button
            key={"Infobutton"}
            className="text-white bg-gray-800/70 bannerButton"
            text="More Info"
            icon={<FaInfoCircle size={20} />}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
