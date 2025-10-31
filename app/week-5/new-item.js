"use client";

import { useState } from "react";

export default function Counter() {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  const categoryOptions = [
    "Produce",
    "Dairy",
    "Bakery",
    "Meat",
    "Frozen Foods",
    "Canned Goods",
    "Dry Goods",
    "Beverages",
    "Snacks",
    "Household",
    "Other",
  ];

  const increment = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const item = { name: name, quantity: quantity, category: category };
    console.log("Item submitted:", item);
    alert(`Item added: ${name}, Quantity: ${quantity}, Category: ${category}.`);
    setName("");
    setCategory("Produce");
    setQuantity(1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md space-y-4"
    >

        <div>
          <input
            type="text"
            id="name"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-40 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 "
          >
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className={`text-center border border-black rounded-md py-2 px-4 font-medium text-black ${
            quantity >= 10
              ? "px-4"
              : "px-5"
          }`}>
            Count: {quantity}
          </span>

          <button
            type="button"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            onClick={increment}
            disabled={quantity >= 20}
          >
            Increment +
          </button>

          <button
            type="button"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            onClick={decrement}
            disabled={quantity <= 1}
          >
            Decrement -
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >Add Item
        </button>

    </form>
  );
}