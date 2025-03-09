import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProductCard = ({ product, onDelete, onEdit }) => {


  
    const { user } = useContext(AuthContext);

  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white">
      <h3 className="text-xl font-bold">{product.name}</h3>
      <p>{product.description}</p>
      <p className="text-green-600 font-semibold">${product.price}</p>
      <p className="text-gray-500">Seller: {product.userId?.name}</p>

      {/* Show Edit & Delete buttons only if user is NOT a buyer */}
      {user?.role === "seller" && (
        <div className="mt-3 flex gap-3">
          {onEdit && (
            <button
              onClick={() => onEdit(product)}
              className="bg-yellow-500 text-white px-3 py-1 rounded shadow-md hover:bg-yellow-600 transition"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(product._id)}
              className="bg-red-500 text-white px-3 py-1 rounded shadow-md hover:bg-red-600 transition"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
