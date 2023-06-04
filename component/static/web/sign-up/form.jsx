"use client";

import Link from "next/link";
import { useState } from "react";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const logIn = async (e) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append("email", email);
    formData.append("password", password);

    const user = await fetch("/api/users/" + email, {
      method: "POST",
      body: formData.toString(),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    console.log(await user.json());
  };

  return (
    <>
      <form onSubmit={logIn}>
        <div className="py-8 space-y-4 text-gray-700 text-lg leading-7">
          <div className="relative">
            <input
              autocomplete="off"
              id="email"
              name="email"
              type="text"
              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
              placeholder="Email address"
              onChange={handleEmailChange}
            />
            <label
              for="email"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Correo Electrónico
            </label>
          </div>
          <div className="relative">
            <input
              autocomplete="off"
              id="password"
              name="password"
              type="password"
              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
            <label
              for="password"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Contraseña
            </label>
          </div>
          <div>
            <input type="checkbox" name="" id="" /> Mantener sesión
          </div>
          <div>
            <Link className="text-ice underline" href={"/recuperacion"}>
              Recuperar contraseña
            </Link>
          </div>
          <div className="relative">
            <button className="bg-ice text-white rounded-md px-2 py-1">
              Ingresar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
