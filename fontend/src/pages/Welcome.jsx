import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4 animate-bounce">WELCOME AT KUSHEL DIGI SOLUTIONS SOFTWARE</h1>
        <p className="text-xl mb-8">Crud web application is waiting.......</p>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-white text-purple-600 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;