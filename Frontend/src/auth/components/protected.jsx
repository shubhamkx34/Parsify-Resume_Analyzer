import { useauth } from "../hooks/useauth";
import { Navigate } from "react-router";
import { Atom } from "react-loading-indicators";

const Protected = ({ children }) => {
  const { loading, user } = useauth();

  if (loading) {
    return (
      <div className="h-screen w-screen bg-gray-950 flex justify-center items-center">
        <Atom color="#1b86bf" size="medium" text="" textColor="#ffffff" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Protected;
