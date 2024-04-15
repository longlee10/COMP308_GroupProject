import Benefits from "./Benefits";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Health Hub
      </h1>
      <p className="text-slate-600 w-1/2 m-auto">
        Welcome to Health Hub, the application designed to support nurse
        practitioners and patients during the critical transition period from
        hospital to home care.
      </p>
      <Benefits />
    </div>
  );
};

export default HomePage;
