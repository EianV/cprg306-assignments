"use client";
import  { useState } from "react"; 

export default function NewItem(){
    const[quantity, setQuantity] = useState(1)

    const increment = () => {
        if (quantity < 20) {setQuantity(quantity +1)};
    };

    const decrement = () => {
        if (quantity > 1) {setQuantity(quantity -1 )};
    };

    return(
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center gap-6 p-8 border-4 border-black w-[1000px] shadow-md">
                <h1 className="text-lg font-semibold">Web Dev Assignment 4 Increment Button!</h1>
                <div className="flex items-center gap-4">
                <button
                    onClick={decrement}
                    disabled={quantity === 1}
                    className={`px-3 py-3 rounded-full text-white ${quantity === 1? "bg-gray-400 cursor-not-allowed": "bg-green-500 hover:bg-green-600"}`}>-</button>

                <span className="text-xl font-bold">{quantity}</span>

                <button
                    onClick={increment}
                    disabled={quantity === 20}
                    className={`px-3 py-3 rounded-full text-white ${quantity === 20? "bg-gray-400 cursor-not-allowed": "bg-green-500 hover:bg-green-600"
                    }`}>+</button>
                </div>
            </div>
        </div>

    );
}

