import FaIcon from "@/component/faIcon";
import { faBell, faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import AuthButton from "./authButton";

const WebHeader = () => {
  return (
    <>
      <div className="bg-white shadow-sm shadow-gray rounded-b-xl">
        <nav className="flex justify-between py-5 items-center container mx-auto">
          <div className="flex justify-between items-center">
            <Link
              href={"/inicio"}
              className="text-xl text-gray-800 font-bold border-2 border-ice"
            >
              <span className="px-1 pb-1 bg-ice text-white">Tiny</span>
              <span className="px-1 pb-1 text-ice">Iglú</span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex items-center border me-6 p-1 rounded-lg px-3">
              <FaIcon icon={faSearch} color={"#e5e7eb"} />
              <input
                className="ml-2 outline-none bg-transparent font-"
                type="text"
                name="search"
                id="search"
                placeholder="Search..."
              />
            </div>
            <ul className="flex items-center space-x-6">
              <li className="font-semibold text-gray-700">
                <Link href={"/inicio"}>Inicio</Link>
              </li>
              <li className="font-semibold text-gray-700">
                <Link href={"/productos"}>Productos</Link>
              </li>
              <li>
                <Link href={"#"}>
                  <FaIcon icon={faBell} size={"10pt"} />
                </Link>
              </li>
              <li>
                <AuthButton />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default WebHeader;
