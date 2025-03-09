import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-500 p-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Welcome, {user?.name}!</h2>
        <p className="text-gray-600 text-lg mt-2">Role: <span className="font-semibold">{user?.role}</span></p>

        <div className="mt-6 flex flex-col gap-4">
          <Link
            to="/products"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition duration-300"
          >
            📦 View Products
          </Link>

          {user?.role === "seller" && (
            <Link
              to="/add-product"
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 transition duration-300"
            >
              ➕ Add Product
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
