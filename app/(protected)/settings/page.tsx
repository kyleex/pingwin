import { auth } from "@/lib/auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/elements/header/header";

const SettingsPage = async () => {
  const session = await auth();

  return (
    <>
      <Header></Header>
      <div>
        <h1>Settings</h1>
        <div>
          {JSON.stringify(session)}
          <LogoutButton>
            <Button variant="secondary" size="lg">
              Sign out
            </Button>
          </LogoutButton>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
