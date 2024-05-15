import React, { useState } from "react";
import Registercpm from "./Registercpm";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import Iniciocmp from "./Iniciocmp";
let token = null;

function LoginCmp() {
  const [islogin, setislogin] = useState(false);
  const [showRegister, setshowRegister] = useState(false);

  const iniciarSesion = async () => {
    const username = document.getElementsByName("username")[0].value;
    const password = document.getElementsByName("password")[0].value;
    try {
      const resp = await axios.get("http://localhost:3100/login", {
        params: {
          username: username,
          password: password,
        },
      });

      if (resp.data.error) {
        alert(resp.data.error);
        setislogin(false);
        token = null;
      } else {
        setislogin(true);
        token = resp.data.token;
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (islogin) {
    return <Iniciocmp />;
  }

  return (
    <div className="conteiner ">
      {/* <div className="col-12">
        <img
          src="https://i.pinimg.com/736x/7b/ee/0b/7bee0b3233e376c41a0b7f533ba3f056.jpg"
          alt="FondoLogin"
        />
      </div> */}
      <div className="d-flex justify-content-center align-items-center">
        {showRegister ? (
          <Registercpm />
        ) : (
          <div className="col-3 m-4 ">
            <img src={logo} className="App-logo" alt="logo" />
            <input
              tabIndex="1"
              type="text"
              name="username"
              className="form-control mb-4"
            />
            <input
              tabIndex="2"
              type="password"
              name="password"
              className="form-control  "
            />
            <div className="d-grid ">
              <button
                tabIndex="3"
                type="button"
                className="btn btn-primary m-4 rounded-pill"
                onClick={iniciarSesion}
              >
                Iniciar Sesión
              </button>
              <button
                tabIndex="4"
                type="button"
                className="btn btn-link"
                onClick={() => setshowRegister(true)}
              >
                Registrarse
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export function getToken() {
  return token;
}
export default LoginCmp;
