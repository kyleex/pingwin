"use client";

export const LoginButton = () => {
  return (
    <button
      className="group relative inline-block text-sm font-medium text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
      onClick={() => "signIn()"}
    >
      <span className="absolute inset-0 translate-x-0 translate-y-0 bg-indigo-600 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"></span>

      <span className="relative block border border-current bg-white px-8 py-3">
        {" "}
        Login{" "}
      </span>
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <button
      className="group relative inline-block text-sm font-medium text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
      onClick={() => "signOut()"}
    >
      <span className="absolute inset-0 translate-x-0 translate-y-0 bg-indigo-600 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"></span>

      <span className="relative block border border-current bg-white px-8 py-3">
        {" "}
        Logout{" "}
      </span>
    </button>
  );
};
