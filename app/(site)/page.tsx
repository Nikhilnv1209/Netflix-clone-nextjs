import Banner from "@/components/Home/Banner/Banner";
import Loading from "@/components/Home/Banner/Loading";
import Navbar from "@/components/Home/Navbar/Navbar";
import { Suspense } from "react";
import Movies from "@/components/Home/Movies/Movies";
import Trending from "@/components/Home/Movies/Trending";

export default async function Home() {
  // console.log();

  return (
    <main className="bg-gradient-to-b bg-cover bg-no-repeat from-gray-500/10 to-[#010511] min-h-[140vh]">
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Banner />
      </Suspense>
      <Trending />
      <Movies genere={36} title="Action" />
    </main>
  );
}
