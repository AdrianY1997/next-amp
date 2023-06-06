"use client";
import { useEffect, useState } from "react";

const ListItems = ({ children }) => {
  return (
    <li className="flex justify-between py-2 px-4 shadow-sm shadow-gray rounded-xl bg-white">
      <div>
        <p>{children.name}</p>
      </div>
      <div className="flex gap-4">
        <p>{children.price}</p>
      </div>
    </li>
  );
};

const Productos = () => {
  const [items, setItems] = useState([
    { id: 0, name: "No hay items", price: "" },
  ]);

  const getItems = async () => {
    const response = await fetch(`/api/products`, {
      method: "POST",
    });

    const products = await response.json();
    if (products.length == 0) {
      setItems([{ id: 0, name: "No hay items", price: "" }]);
    } else {
      setItems(products);
    }
  };

  useEffect(() => {
    getItems();
  }, []);
  return (
    <>
      <div className="p-5">
        <h1>Productos</h1>
        <ul className="py-5 flex flex-col gap-2">
          {items &&
            items.map((e) => {
              return <ListItems key={e.id}>{e}</ListItems>;
            })}
        </ul>
      </div>
    </>
  );
};

export default Productos;
