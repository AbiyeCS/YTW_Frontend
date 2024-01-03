import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function ViewUsersByRole() {
  
    const [users, setUsers] = useState([]);
    const { role } = useParams();

    useEffect(() => {
      loadUsers();
    }, [role]);


    const loadUsers = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/users/${role}`);
        setUsers(result.data);
      } catch (error) {
        console.error("Error loading users:", error);
      }
    };

  return (
    <div className="container">
      <div className="py-4">
      <h2>{role}</h2>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {
                users.map((user, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                  </tr>
                  ))
            }
          </tbody>
        </table>
        <Link className="btn btn-primary mx-2" to="/">
              Home
            </Link>
      </div>
    </div>
  );
}
