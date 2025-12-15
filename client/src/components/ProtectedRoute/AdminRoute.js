import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ element: Element, user }) => {
  const [loading, setLoading] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    const storedUser = user || JSON.parse(localStorage.getItem("profile"));
    setCurrentUser(storedUser);
    setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        Checking access...
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  const role = currentUser?.result?.role || currentUser?.role;
  if (role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  return <Element />;
};

export default AdminRoute;
