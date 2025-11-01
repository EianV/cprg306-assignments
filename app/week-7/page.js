"use client"

import ItemList from "./item-list";
import Counter from "./new-item";
import itemsData from "./items.json"
import { useState } from "react";

export default function Page() {

  const [items, setItems] = useState(itemsData);
  
  const handleAddItem = (newItem) => {
    setItems(prevArray => [...prevArray, newItem]);;
  } 

  

  return (
    <main>
      <Counter onAddItem = {handleAddItem}/>
      <h1 className="text-6xl text-center font-bold">Shopping List</h1>
      <ItemList itemsArray = {items}/>
    </main>
  );
}