"use client";

import FaIcon from "@/component/faIcon";
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faBan,
  faRotateRight,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const ListItems = ({ children }) => {
  const [hidden, setHidden] = useState("");
  const deleteRef = useRef(null);

  const deleteItem = async (e) => {
    const id = deleteRef.current.getAttribute("data-id");
    const formData = new URLSearchParams();
    formData.append("id", id);
    const response = await fetch(`/api/products/delete/${id}`, {
      method: "POST",
      body: formData.toString(),
    });

    const product = await response.json();

    if (response.status != 200 || product.error) {
      return toast.error("No se ha podido eliminar el producto.");
    }

    setHidden("hidden");
    return toast.success("Se ha eliminado el producto.");
  };

  return (
    <li
      className={`flex justify-between py-2 px-4 shadow-sm shadow-gray rounded-xl bg-white ${hidden}`}
    >
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
          <button data-id={children.id} ref={deleteRef} onClick={deleteItem}>
            <FaIcon icon={faTrashAlt} color={"red"} />
          </button>
        </div>
      )}
    </li>
  );
};

const DashboardProducts = () => {
  const [items, setItems] = useState([
    { id: 0, name: "No hay items", price: "" },
  ]);

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

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

    setOpen(false);

    if (response.status != 200 || products.error) {
      return toast.error("No se ha podido eliminar los registros");
    }

    getItems();
    toast.success("Se han eliminado todos los registros");
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <div className="p-5">
        <div>
          <p className="border-b-2 pe-2 border-gray-400 w-fit mb-4 font-semibold text-lg text-gray-400">
            Productos
          </p>
        </div>
        <div className="flex gap-5">
          <button className="bg-slate-500 rounded-lg py-2 px-4 text-white">
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
            onClick={() => setOpen(true)}
          >
            <FaIcon icon={faBan} color={"white"} />
          </button>
        </div>
        <ul className="py-5 flex flex-col gap-2">
          {items &&
            items.map((e) => {
              return <ListItems key={e.id}>{e}</ListItems>;
            })}
        </ul>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <FaIcon icon={faTriangleExclamation} color={"red"} />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Confirmación
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            ¿Esta seguro que desea eliminar todos los registros?{" "}
                            <br />
                            esta acción es permanente e irreversible.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={truncateItems}
                    >
                      Eliminar registros
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancelar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default DashboardProducts;
