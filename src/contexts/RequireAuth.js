import { useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function RequireAuth({ children }) {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      // return <Navigate to="/" replace={true} />;
      navigate("/");
    }
  }, []);

  return children;
}
