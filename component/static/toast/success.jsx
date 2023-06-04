const { default: FaIcon } = require("@/component/faIcon");
const { faCheck, faClose } = require("@fortawesome/free-solid-svg-icons");

const ToastSuccess = ({ children }) => {
  return (
    <>
      <div className="flex justify-between">
        <div className="w-7 h-7 rounded-md bg-green-500 flex justify-center items-center">
          <FaIcon icon={faCheck} color={"white"} />
        </div>
        <div className="flex">
          <p className="self-center">{children}</p>
          <button>
            <FaIcon icon={faClose} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ToastSuccess;
