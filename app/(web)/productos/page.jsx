"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ListItems = ({ children }) => {
  return (
    <>
      <li className="flex justify-between p-4 shadow-sm shadow-gray rounded-xl bg-white">
        <div className="flex gap-4">
          <div>
            {children.img_path && (
              <Image
                alt={`Vista previa del producto ${children.name}`}
                width={150}
                height={266.67}
                src={`/img/products/${children.img_path}`}
              />
            )}
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <div>
                <p className="font-semibold text-xl">{children.name}</p>
              </div>
              <div className="flex gap-4">
                <p className="text-gray-500">{children.price}</p>
              </div>
              <div className="flex gap-4">
                <p className="text-gray-500">{children.description}</p>
              </div>
            </div>
            {children.id != 0 && (
              <div>
                <button className="px-4 py-2 bg-slate-500 text-white rounded-md shadow-sm shadow-gray-500">
                  <Link href="#" className="">
                    Detalles
                  </Link>
                </button>
              </div>
            )}
          </div>
        </div>
      </li>
    </>
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

    if (products.length == 0 || products.error) {
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
