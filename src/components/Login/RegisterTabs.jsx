import React from "react";
import { useState } from "react";
import { PostData } from "../../Auth/Axios";
import LoginForm from "./LoginForm";
import TitleLogin from "./TitleLogin";
const RegisterTabs = () => {
  const [registerVal, setRegisterVal] = useState({ nama_lengkap: "", email: "", password: "", confirm_password: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterVal((prevState) => ({
      ...prevState,
      [name]: [value],
    }));
  };
  const handleSubmit = () => {
    localStorage.setItem("registerVal", JSON.stringify(registerVal));
    const value = JSON.parse(localStorage.getItem("registerVal"));
    console.log(value.email.toString());
    console.log(registerVal.email.toString());
    PostData("https://ppdbmin.kkafi09.my.id/api/auth/register", {
      nama_lengkap: value.nama_lengkap.toString(),
      email: value.email.toString(),
      password: value.password.toString(),
      confirm_password: value.confirm_password.toString(),
    });
  };
  return (
    <>
      <div className="content-wrap mt-8 flex justify-center flex-col">
        <TitleLogin desc={"Buat email dan kata sandi untuk login"} />
        <div className="form-content mt-7">
          <LoginForm label={"Nama Siswa"} type={"text"} placeholder={"cth: Tommy Kurniawan"} onChange={handleChange} value={registerVal.nama_lengkap} name={"nama_lengkap"} />
          <LoginForm label={"Email"} type={"email"} placeholder={"cth: tommykurniawan123@gmail.com"} onChange={handleChange} value={registerVal.email} name={"email"} />
          <LoginForm label={"Kata sandi"} type={"password"} onChange={handleChange} value={registerVal.password} name={"password"} />
          <LoginForm label={"Ulangi Kata Sandi"} type={"password"} onChange={handleChange} value={registerVal.confirm_password} name={"confirm_password"} />
        </div>
        <div className="button-login mt-4">
          <button type="submit" onClick={handleSubmit} className="py-2 w-full rounded-full bg-green-900 text-white font-semibold text-base">
            Daftar
          </button>
        </div>
      </div>
    </>
  );
};

export default RegisterTabs;
