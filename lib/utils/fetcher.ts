const BaseUrl = "https://api.themoviedb.org/3";
const apiKey = process.env.NEXT_PUBLIC_TBDB_API_KEY;
export const imageUrl = "https://image.tmdb.org/t/p/original";
const fetcher = async (url: string, pageno?: number) => {
  const res = await fetch(
    `${BaseUrl}${url}?api_key=${apiKey}&language=en-US&page=${
      pageno ? pageno : 2
    }`,
    {
      next: {
        revalidate: 1200,
      },
    }
  );
  const data = await res.json();
  return data;
};

export default fetcher;
