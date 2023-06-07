import FaIcon from "@/component/faIcon";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faClipboardList,
  faGaugeHigh,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const AuthSideMenu = () => {
  return (
    <>
      <div className="bg-[#060606] h-[100vh] sticky top-0">
        <div className="flex justify-between items-center py-3 px-3">
          <p className="text-xl text-gray-800 font-bold border-2 border-white">
            <span className="px-1 pb-1 bg-white text-black">T</span>
            <span className="px-1 pb-1 text-white">I</span>
          </p>
        </div>
        <div className="text-center flex flex-col gap-3">
          <Link href={"/dashboard"}>
            <button className="bg-[#5a5f73] w-10 h-10  rounded-lg flex mx-auto justify-center items-center">
              <FaIcon icon={faGaugeHigh} color={"white"} size={"55%"} />
            </button>
          </Link>
          <Link href={"/dashboard/destacados"}>
            <button className="bg-[#5a5f73] w-10 h-10  rounded-lg flex mx-auto justify-center items-center">
              <FaIcon icon={faStar} color={"white"} size={"55%"} />
            </button>
          </Link>
          <Link href={"/dashboard/productos"}>
            <button className="bg-[#5a5f73] w-10 h-10  rounded-lg flex mx-auto justify-center items-center">
              <FaIcon icon={faClipboardList} color={"white"} size={"55%"} />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AuthSideMenu;
