const Loading = async () => {
  return (
    <div className="relative w-screen h-screen animate-pulse">
      <div className="w-full h-screen bg-gray-500 lg:h-full "></div>
      <div
        className="absolute top-[25%] left-6 z-10 min-w-[200px] w-[40%]
        flex flex-col gap-3 py-2 bg-transparent animate-pulse
        "
      >
        <div className="h-20 font-bold bg-gray-600 rounded-md"></div>
        <div className="h-40 bg-gray-600 rounded-md"></div>
        <div className="flex h-10 gap-3 px-2 xl:mt-3">
          <div className="w-32 h-10 bg-white rounded-md"></div>
          <div className="w-32 h-10 rounded-md bg-gray-800/70 "></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
