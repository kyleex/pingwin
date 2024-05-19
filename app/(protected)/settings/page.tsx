import { auth } from "@/lib/auth";

const SettingsPage = async () => {
  const session = await auth();

  return (
    <div>
      <h1>Settings</h1>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
};

export default SettingsPage;
