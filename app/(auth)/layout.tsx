const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-color: #F2F2F2">
      {" "}
      {children}{" "}
    </div>
  );
};

export default AuthLayout;
