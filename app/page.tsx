import { auth } from "@/src/lib/auth";
import { LoginButton, LogoutButton } from "./authButtons";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <h1>
        {session?.user
          ? "Authentificated " + session?.user.email
          : "Not Authentificated"}
      </h1>
      <div>{!session?.user ? <LoginButton /> : <LogoutButton />}</div>
    </div>
  );
}
