"use client";

import FaIcon from "@/component/faIcon";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";

const Dashboard = () => {
  return (
    <>
      <div className="p-5">
        <h1>Bienvenido</h1>
        <div>
          <p>Links rapidos</p>
          <ul role="list" className="flex flex-col gap-4 w-fit">
            <li>
              <button className="bg-slate-500 rounded-lg py-2 px-4 w-full">
                <Link href={"/inicio"}>
                  <div className="flex gap-x-2 text-left items-center">
                    <FaIcon icon={faQuestionCircle} />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        Inicio
                      </p>
                    </div>
                  </div>
                </Link>
              </button>
            </li>
            <li>
              <button className="bg-slate-500 rounded-lg py-2 px-4 w-full">
                <Link href={"/productos"}>
                  <div className="flex gap-x-2 text-left items-center">
                    <FaIcon icon={faQuestionCircle} />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        productos
                      </p>
                    </div>
                  </div>
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
