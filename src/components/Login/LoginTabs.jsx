import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addDataToApi, getDataFromApi } from "../../config/Axios/AxiosGet";
import { loginAction } from "../../config/firebase/Auth/Login";
import LoginForm from "./LoginForm";
import TitleLogin from "./TitleLogin";

const LoginTabs = () => {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(false);
  useEffect(() => {
    if (isLogin) {
      navigate("/pages");
    }
  });

  const login = async () => {
    await loginAction();
    setLogin(true);
    getDataFromApi();
  };
  return (
    <>
      <section className="wrapper flex w-full justify-center ">
        <div className=" content-wrap mt-8 flex justify-center rounded-xl shadow-2xl px-8 py-16 bg-white flex-col">
          <figure className="w-full flex flex-row justify-center">
            <img src={require("../../assets/Logo_SMK.png")} className="w-10 text-center" alt="" />
          </figure>
          <TitleLogin desc={"Masukan email dan password yang sudah dibuat"} />
          <div className="form-content mt-7">
            <LoginForm label={"Email"} type={"email"} placeholder={"cth: Tommy Kurniawan"} />
            <LoginForm label={"Kata Sandi"} type={"password"} />
          </div>
          <div className="button-login mt-4">
            <button type="submit" className="py-2 w-full rounded-full bg-red-600 text-white font-semibold text-base">
              Login
            </button>
            <div className="w-full h-px my-3 bg-gray-300 "></div>
            <p className="my-5">atau login dengan</p>
            <button type="submit" onClick={login} className="py-2 w-full rounded-full border-2 border-red-600  text-green-900 font-semibold text-base">
              Google
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginTabs;
