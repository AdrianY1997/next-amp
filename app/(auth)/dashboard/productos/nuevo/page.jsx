"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const NewProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImagePath, setProductImagePath] = useState(
    "no-image-product-large.jpg"
  );
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const productImageInput = useRef(null);

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductPriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const handleProductDescriptionChange = (e) => {
    setProductDescription(e.target.value);
  };

  const handleImageInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const fireImageInputClick = () => {
    productImageInput.current.click();
  };

  const insertProduct = async (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append("name", productName);
    body.append("price", productPrice);
    body.append("description", productDescription);
    body.append("file", image);

    const response = await fetch(`/api/products/new`, {
      method: "POST",
      body,
    });

    const product = await response.json();

    if (product.error) {
      return toast.error(product.error.message);
    }

    if (product.affectedRow == 0)
      return toast.warning("No se ha podido insertar el producto");

    e.target.reset();
    setCreateObjectURL(null);
    return toast.success(
      `Se ha insertado el producto: [${product.insertId}-${productName}]`
    );
  };

  return (
    <>
      <div className="p-5 ">
        <form
          onSubmit={insertProduct}
          className="bg-white p-10 shadow-sm shadow-gray rounded-xl"
        >
          <h1 className="mb-5 text-xl font-semibold">Agregar producto</h1>
          <div className="flex gap-5">
            <div>
              <div>
                <Image
                  src={createObjectURL ?? `/img/products/${productImagePath}`}
                  alt="Imagen para el producto nuevo"
                  width={150}
                  height={266.67}
                  onClick={fireImageInputClick}
                />
              </div>
            </div>
            <div className="w-full">
              <div className="relative w-full mt-1">
                <input
                  autoComplete="off"
                  id="product-name"
                  name="product-name"
                  type="text"
                  className="border pt-9 pb-5 px-3 peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="Producto"
                  onChange={handleProductNameChange}
                />
                <label
                  htmlFor="product-name"
                  className="absolute left-3 top-2 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-4 transition-all peer-focus:top-2 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Nombre
                </label>
              </div>
              <div className="mt-4 relative">
                <input
                  autoComplete="off"
                  id="product-price"
                  name="product-price"
                  type="text"
                  className="border pt-9 pb-5 px-3 peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="Precio"
                  onChange={handleProductPriceChange}
                />
                <label
                  htmlFor="product-price"
                  className="absolute left-3 top-2 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-4 transition-all peer-focus:top-2 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Precio
                </label>
              </div>
              <div className="w-full mt-4 relative flex">
                <textarea
                  style={{ height: "70px" }}
                  autoComplete="off"
                  id="product-description"
                  name="product-description"
                  type="text"
                  className="border pt-6 pb-5 px-3 peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="Precio"
                  onChange={handleProductDescriptionChange}
                />
                <label
                  htmlFor="product-description"
                  className="absolute left-3 top-2 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-4 transition-all peer-focus:top-2 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Descripción
                </label>
              </div>
              <div className="relative w-full flex justify-between mt-4">
                <button className="bg-slate-500 rounded-lg py-2 px-4 text-white">
                  Agregar
                </button>
                <Link
                  href={"/dashboard/productos"}
                  className="bg-slate-500 rounded-lg py-2 px-4 text-white"
                >
                  Volver
                </Link>
              </div>
            </div>
          </div>
          <input
            className="hidden"
            type="file"
            name="product-image"
            id="product-image"
            ref={productImageInput}
            onChange={handleImageInputChange}
          />
        </form>
      </div>
    </>
  );
};

export default NewProduct;
