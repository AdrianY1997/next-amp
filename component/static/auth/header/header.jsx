"use client";

import FaIcon from "@/component/faIcon";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRightFromBracket,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { Menu, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Fragment, useState } from "react";

const AuthHeader = () => {
  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/ingreso");
    },
  });

  const closeSession = () => {
    signOut();
  };

  return (
    <>
      <div className="flex justify-between bg-[#060606] px-5 py-2">
        <div className="self-center">
          <h1 className="text-white">Dashboard</h1>
        </div>
        <div>
          <Menu as={"div"} className="relative">
            <p className="text-white flex items-center gap-5">
              <FaIcon icon={faUserCircle} size={"16px"} color={"white"} />
              <Menu.Button
                className="bg-[#5a5f73] py-2 px-4 rounded-lg"
                id="menu-auth"
                aria-expanded="true"
                aria-haspopup="true"
              >
                {data.user.email} <FaIcon icon={faCaretDown} color={"white"} />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className="absolute right-0 z-10 top-full mt-5 w-56 origin-top-right rounded-md bg-[#060606] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="none"
                >
                  <Menu.Item>
                    <button
                      type="submit"
                      className="block w-full px-4 py-2 text-left text-sm text-white"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-3"
                      onClick={closeSession}
                    >
                      Salir{" "}
                      <FaIcon icon={faArrowRightFromBracket} color={"white"} />
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </p>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default AuthHeader;
