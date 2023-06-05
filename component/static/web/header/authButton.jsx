"use client";

import FaIcon from "@/component/faIcon";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Menu, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";

const SignInButton = () => {
  return (
    <>
      <Link href={"/ingreso"}>
        <FaIcon icon={faUserCircle} />
      </Link>
    </>
  );
};

const ProfileMenuButton = () => {
  const closeSession = () => {
    signOut();
  };

  return (
    <>
      <Menu as={"div"} className="relative">
        <Menu.Button
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          className="cursor-pointer"
        >
          <FaIcon icon={faUserCircle} />
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
            class="absolute right-0 z-10 mt-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="none"
          >
            <Menu.Item>
              <Link
                href="/dashboard"
                class="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabindex="-1"
                id="menu-item-0"
              >
                Dashboard
              </Link>
            </Menu.Item>
            <Menu.Item>
              <button
                type="submit"
                class="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                role="menuitem"
                tabindex="-1"
                id="menu-item-3"
                onClick={closeSession}
              >
                Salir <FaIcon icon={faArrowRightFromBracket} />
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

const AuthButton = () => {
  const { status } = useSession();

  return (
    <>{status === "authenticated" ? <ProfileMenuButton /> : <SignInButton />}</>
  );
};

export default AuthButton;
