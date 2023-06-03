import Link from "next/link";

const WebFooter = () => {
  return (
    <div className="bg-white rounded-t-xl border-t">
      <div className="py-5 flex flex-col justify-center items-center bg-white ">
        <Link
          href={"/inicio"}
          className="text-xl text-gray-800 font-bold border-2 border-ice"
        >
          <span className="px-1 pb-1 bg-ice text-white">Tiny</span>
          <span className="px-1 pb-1 text-ice">Iglú</span>
        </Link>
        <p className="focus:outline-none mt-6 text-xs lg:text-sm leading-none text-gray-900 dark:text-gray-50">
          <span>{new Date().getFullYear()}</span> HappyFox Devs. All Rights
          Reserved.
        </p>
      </div>
    </div>
  );
};

export default WebFooter;
