import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import WelcomePage from "./pages/Welcome";
import Footer from "./components/footer";



const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<WelcomePage/>}/>
          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["buyer", "seller"]}><Dashboard /></ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProtectedRoute allowedRoles={["buyer", "seller"]}><Products /></ProtectedRoute>} />
          <Route path="/add-product" element={<ProtectedRoute allowedRoles={["seller"]}><AddProduct /></ProtectedRoute>} />
        </Routes>
        <Footer/>
      </Router>
      
    </AuthProvider>
  );
};

export default App;
