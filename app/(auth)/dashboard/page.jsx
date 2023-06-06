"use client";

import FaIcon from "@/component/faIcon";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";

const Dashboard = () => {
  return (
    <>
      <div className="p-5">
        <div>
          <p className="border-b-2 pe-2 border-gray-400 w-fit mb-4 font-semibold text-lg text-gray-400">
            Inicio
          </p>
        </div>
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
