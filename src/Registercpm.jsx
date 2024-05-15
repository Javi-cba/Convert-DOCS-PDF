import axios from "axios";
import React, { useEffect, useState } from "react";
import App from "./App";

const Registercpm = () => {
  const [rolesDB, SetRolesDB] = useState([]);
  const [isregister, setregister] = useState(false);

  useEffect(() => {
    fetchDataRoles();
  }, []);

  const Registrarse = async () => {
    const nombre = document.getElementsByName("name")[0].value;
    const username = document.getElementsByName("username")[0].value;
    const password1 = document.getElementsByName("password1")[0].value;
    const password2 = document.getElementsByName("password2")[0].value;
    const idRole = document.getElementsByName("role")[0].value;

    if (password1 !== password2) {
      await alert("Las contraseñas deben coincidir");
      return;
    }

    if (
      nombre.trim() === "" ||
      username.trim() === "" ||
      password1.trim() === "" ||
      password2.trim() === ""
    ) {
      await alert("Por favor, completa todos los campos.");
    } else {
      const resp = await axios.post("http://localhost:3100/user", {
        nombre: nombre,
        username: username,
        password: password1,
        idRole: idRole,
      });

      await alert(resp.data);
      setregister(true);
    }
  };

  async function fetchDataRoles() {
    try {
      const resp = await axios.get(`http://localhost:3100/role`);
      const getRoles = resp.data;
      SetRolesDB(getRoles);
    } catch (error) {
      console.error("Error :", error);
    }
  }

  if (isregister) {
    <App />;
  }

  return (
    <div className=" m-4 ">
      <input
        tabindex="1"
        type="text"
        name="name"
        placeholder="Ingrese su Nombre"
        className="form-control mb-4"
      />
      <input
        tabindex="2"
        type="text"
        name="username"
        placeholder="Ingrese un Nombre de Usuario"
        className="form-control mb-4"
      />
      <input
        tabindex="3"
        type="password"
        name="password1"
        placeholder="Ingrese una Contraseña"
        className="form-control  "
      />
      <input
        tabindex="4"
        type="password"
        name="password2"
        placeholder="Confirme la Contraseña"
        className="form-control  mt-4"
      />
      <select className="form-control mt-4" tabindex="5" name="role">
        {rolesDB.map((role) => (
          <option value={role.id}>{role.tiporol}</option>
        ))}
      </select>
      <div className="d-grid ">
        <button
          tabindex="6"
          type="button"
          className="btn btn-primary m-4 rounded-pill"
          onClick={Registrarse}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default Registercpm;
