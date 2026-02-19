const DesktopOnly = () => {
  return (
    <div className="desktop relative w-screen h-screen overflow-hidden text-white">

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src="src\public\Sabrina.mp4"
      />
<div className="absolute inset-0 bg-black/10 -z-0"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">

        <h1 className="rounded-3xl cursor-default hover:scale-125 duration-300 transition ease-in-out px-6 py-3 font-semibold backdrop-blur-md shadow-xl/20 inset-shadow-sm inset-shadow-current/35 mb-3 w-fit ">
          Desktop Only Experience
        </h1>

        <p className="text-white/80 text-md w-[75%]">
          This portfolio by Bhaskar Mishra is optimized only for desktop devices.
        </p>

        <p className="text-white/60 mt-2">
          Please open on a laptop or PC.
        </p>

     
    </div>
    </div>
  );
};

export default DesktopOnly;