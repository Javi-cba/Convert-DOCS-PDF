import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const { getToken } = require("./Logincmp");
const URL = "http://localhost:3100";

const Usercmp = () => {
  const [usersDB, SetUsersDB] = useState([]);
  const [rolesDB, SetRolesDB] = useState([]);

  useEffect(() => {
    fetchData();
    fetchDataRoles();
  }, []);

  async function fetchData() {
    try {
      const resp = await axios.get(`${URL}/user`, {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      });
      const getUser = resp.data;
      SetUsersDB(getUser);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function fetchDataRoles() {
    try {
      const resp = await axios.get(`${URL}/role`);
      const getRoles = resp.data;
      SetRolesDB(getRoles);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const changedSlcRol = async (event) => {
    const idUser = event.target.dataset.userid;
    const idRole = event.target.value;
    const token = getToken();
    await axios.put(`${URL}/roluser`, null, {
      headers: {
        Authorization: "Bearer " + token,
      },
      params: {
        idUser: idUser,
        idRole: idRole,
      },
    });
    fetchData();
  };

  const changedChkVig = async (event) => {
    const id = event.target.dataset.id;
    const checked = event.target.checked;
    const token = getToken();
    if (!checked) {
      const resp = await axios.put(`${URL}/suspenderuser`, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          id: id,
        },
      });
      console.log(resp);
    } else {
      await axios.put(`${URL}/habilitaruser`, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          id: id,
        },
      });
    }

    fetchData();
  };
  return (
    <div>
      <nav class="navbar  navbar-expand-lg navbar-light navb p-1">
        <img
          src="https://c8.alamy.com/compes/2dybm2b/convertir-el-archivo-pdf-a-la-ilustracion-del-vector-del-icono-del-glifo-de-word-pad-2dybm2b.jpg"
          width="40"
          height="50"
          class="navbar-brand d-inline-block align-top rounded-circle"
          alt="IMFF"
        />
        <b>CONVERSOR WORD A PDF</b>
        <div class="collapse navbar-collapse " id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link to="/home" class="nav-link ">
                Home
              </Link>
            </li>
            <li class="nav-item ">
              <Link to="/users" class="nav-link ">
                Users
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="d-flex justify-content-center align-items-center">
        <div className="col-8 m-4 ">
          <table class="table table-dark">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">UserName</th>
                <th scope="col">Role</th>
                <th scope="col">Validity</th>
              </tr>
            </thead>
            <tbody>
              {usersDB.map((user) => (
                <tr key={user.id}>
                  <th scope="row">{user.nombre}</th>
                  <td>{user.username}</td>
                  <td>
                    <select
                      onChange={changedSlcRol}
                      data-userid={user.id}
                      className="bg-dark text-light"
                    >
                      <option value={user.idrole}>{user.tiporol}</option>
                      {rolesDB.map((role) => (
                        <option value={role.id}>{role.tiporol}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      data-id={user.id}
                      checked={user.vigencia === 1 ? true : false}
                      onChange={changedChkVig}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Usercmp;
