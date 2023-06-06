"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const NewProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductPriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const insertProduct = async (e) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append("name", productName);
    formData.append("price", productPrice);
    const response = await fetch(
      `/api/products/new/${productName}/${productPrice}`,
      {
        method: "POST",
        body: formData.toString(),
      }
    );

    const product = await response.json();

    if (product.affectedRow == 0)
      return toast.warning("No se ha podido insertar el producto");

    e.target.reset();
    return toast.success(
      `Se ha insertado el producto: [${product.insertId}-${productName}]`
    );
  };

  return (
    <>
      <div className="p-5 ">
        <div>
          <p className="border-b-2 pe-2 border-gray-400 w-fit mb-4 font-semibold text-lg text-gray-400">
            Producto Nuevo
          </p>
        </div>
        <form
          onSubmit={insertProduct}
          className="bg-white p-10 shadow-sm shadow-gray rounded-xl"
        >
          <h1 className="mb-5 text-lg font-semibold">Agregar producto</h1>
          <div className="flex flex-col gap-5">
            <div className="relative">
              <input
                autoComplete="off"
                id="product-name"
                name="product-name"
                type="text"
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                placeholder="Producto"
                onChange={handleProductNameChange}
              />
              <label
                htmlFor="product-name"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Nombre
              </label>
            </div>
            <div className="relative">
              <input
                autoComplete="off"
                id="product-price"
                name="product-price"
                type="text"
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                placeholder="Precio"
                onChange={handleProductPriceChange}
              />
              <label
                htmlFor="product-price"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Precio
              </label>
            </div>
            <div className="relative flex justify-between">
              <button className="bg-slate-500 rounded-lg py-2 px-4">
                Agregar
              </button>
              <Link
                href={"/dashboard/productos"}
                className="bg-slate-500 rounded-lg py-2 px-4"
              >
                Volver
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewProduct;
