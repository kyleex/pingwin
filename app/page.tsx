import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

export default async function Home() {
  return (
    <main className="w-full h-full flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          🔐 Auth
        </h1>
        <p className="text-white text-lg">A simple authentification service</p>
        <div>
          <LoginButton>
            <Button variant="outline" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
