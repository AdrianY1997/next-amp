"use client";

import FaIcon from "@/component/faIcon";
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faBan, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ListItems = ({ children }) => {
  return (
    <li className="flex justify-between py-2 px-4 shadow-sm shadow-gray rounded-xl bg-white">
      <div>
        <p>
          {children.id} | {children.name}
        </p>
      </div>
      {children.id == 0 ? (
        <></>
      ) : (
        <div className="flex gap-4">
          <p>{children.price}</p>
          <div className="h-full w-0.5 bg-ice rounded-lg"></div>
          <button>
            <Link href={`/dashboard/productos/editar/${children.id}`}>
              <FaIcon icon={faEdit} color={"darkcyan"} />
            </Link>
          </button>
          <button>
            <FaIcon icon={faTrashAlt} color={"red"} />
          </button>
        </div>
      )}
    </li>
  );
};

const DashboardProducts = () => {
  const [items, setItems] = useState(null);

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
    toast.success("Se han actualizado todos los registros");
  };

  const truncateItems = async () => {
    const response = await fetch(`/api/products/truncate`, {
      method: "POST",
    });

    const products = await response.json();
    toast.success("Se han eliminado todos los registros");
    getItems();
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <div className="p-5">
        <div className="flex gap-5">
          <button className="bg-slate-500 rounded-lg py-2 px-4">
            <Link href="/dashboard/productos/nuevo">Agregar</Link>
          </button>
          <button
            className="bg-slate-500 rounded-lg py-2 px-4"
            onClick={getItems}
          >
            <FaIcon icon={faRotateRight} color={"white"} />
          </button>
          <button
            className="bg-slate-500 rounded-lg py-2 px-4"
            onClick={truncateItems}
          >
            <FaIcon icon={faBan} color={"white"} />
          </button>
        </div>
        <ul className="py-5 flex flex-col gap-2">
          {items &&
            items.map((e) => {
              return <ListItems>{e}</ListItems>;
            })}
        </ul>
      </div>
    </>
  );
};

export default DashboardProducts;
