import Benefits from "./Benefits";
import home from "../assets/home.png";

const HomePage = () => {
  return (
    <div className="flex gap-10">
      <div className="flex flex-col gap-5 items-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Health Hub
        </h1>
        <p className="text-slate-600">
          Welcome to Health Hub, the application designed to support nurse
          practitioners and patients during the critical transition period from
          hospital to home care.
        </p>
        <img src={home} alt="" className="h-96 w-96" />
      </div>
      <Benefits />
    </div>
  );
};

export default HomePage;
