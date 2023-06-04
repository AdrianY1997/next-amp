import SignupForm from "@/component/static/web/sign-up/form";

const Ingreso = () => {
  return (
    <>
      <div className="bg-gray-100 py-20 flex flex-col justify-center">
        <div className="relative py-3 max-w-xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-ice to-blue-300 shadow-lg transform skew-y-6 rotate-6 rounded-3xl"></div>
          <div className="relative bg-white shadow-lg rounded-3xl p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold text-center">
                  Ingreso para administradores
                </h1>
              </div>
              <div className="divide-y divide-gray-200">
                <SignupForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ingreso;
