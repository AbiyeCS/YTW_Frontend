import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


export default function ViewUser() {

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        role: ""
      });

      const {id}=useParams()

  useEffect(() => {
    loadUser()
    document.title= "View User"
  }, [])

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`)
    setUser(result.data)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          <div className='card'>
            <div className='card-header'>
                Details of user id: {id}
                <ul className='list-group list group-flush'>
                    <li className='list-group-item'>
                        <b>Name: {user.name} </b>
                    </li>
                    <li className='list-group-item'>
                        <b>Username: {user.username} </b>
                    </li>
                    <li className='list-group-item'>
                        <b>Email: {user.email} </b>
                    </li>
                    <li className='list-group-item'>
                        <b>Role: {user.role} </b>
                    </li>
                </ul>
            </div>
          </div>
          <Link className="btn btn-primary mx-2" to="/">
              Home
            </Link>
        </div>
      </div>
    </div>
  );
}
