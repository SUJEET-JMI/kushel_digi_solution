import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <Link to="/">Home</Link>
      {user && <Link to="/products">Products</Link>}
      {user?.role === "seller" && <Link to="/add-product">Add Product</Link>}
      {user ? <button onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}
    </nav>
  );
};

export default Navbar;
