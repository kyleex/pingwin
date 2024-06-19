import { indieFlower } from "@/lib/fonts";
import { Separator } from "@/components/ui/separator";

const header = () => {
  return (
    <div className="p-2 w-full sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-md">
      <div className="flex flex-row justify-between mb-2 items-center py-2">
        <span>
          <h1 className={`${indieFlower} text-lg`}>Welcome to pingwin</h1>
          <h3 className="text-xs">Get ready to smash !</h3>
        </span>
        <img
          src="/logo-pingwins.svg"
          alt="logo-pingwins"
          className="max-w-10 max-h-10"
        />
      </div>
      <Separator orientation="horizontal" />
    </div>
  );
};

export default header;
