import { useState } from "react";
import PropTypes from "prop-types";
import img from "../assets/offer-1.png";

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  return (
    <div className="border-b border-gray-300 py-4 flex">
      <img src={img} alt={item.name} className="w-20 h-20 object-cover" />
      <div className="flex-1 ml-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold">{item.name}</h2>
          <p className="text-lg font-bold">${item.price}</p>
        </div>
        <p>Colour: {item.color}</p>
        <p>Size: {item.size}</p>
        <div className="flex items-center mt-2">
          <p>Quantity: </p>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-12 ml-2 border border-gray-300 rounded p-1"
          />
        </div>
        <button className="text-red-500 mt-2">Remove</button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartItem;