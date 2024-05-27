import { indieFlower } from "@/lib/fonts";

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <img src="/logo-pingwins.svg" alt="Pingwins logo" className="w-24 h-24" />
      <h1 className={`${indieFlower} text-3xl text-secondary`}>Pingwin</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
