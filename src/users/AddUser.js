import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';

export default function AddUser() {

    let navigate = useNavigate()
    
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    role: ""
  });

  const { name, username, email } = user;

  const [errors, setErrors] = useState({
    name: '',
    username: '',
    email: '',
  });

  useEffect(() => {
    document.title= "Add New User"
  }, [])

  // State to keep track of the selected role
  const [selectedRole, setSelectedRole] = useState('Select Role');

  // Function to handle role selection
  const handleSelect = (role) => {
    // Convert role to uppercase before setting it as Enum in backend
  const uppercaseRole = role.toUpperCase();
    setUser({ ...user, role: uppercaseRole });
    setSelectedRole(role); // Update the state with the selected role
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', username: '', email: '' };

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = 'Valid email is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault(); 
    // If have this in it prevents showing any extra data within the URL, in more techinical terms 
    // The preventDefault method is a standard method provided by the DOM (Document Object Model) in web browsers. 
    // When called on an event, it prevents the default behavior associated with that event from occurring.
    // In the context of a form submission event (submit), the default behavior is to submit the form and reload the page. 
    // By calling e.preventDefault(), this function prevents the default form submission behavior. This is often done in React to handle form 
    // submissions manually, allowing the developer to perform custom actions (such as making an asynchronous request, updating state, etc.) 
    // without triggering a full page reload.

    if(validateForm()) {

      await axios.post("http://localhost:8080/user", user) // Posts the user object we created to the database

      navigate("/") // navigates back to the home page 
    }
  };

  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register User</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input type="text" className={`form-control ${errors.name && 'is-invalid'}`} placeholder="Enter your name" name="name" value={name} onChange={(e) => onInputChange(e)} />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>} {/* Added Here */}
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input type="text" className={`form-control ${errors.username && 'is-invalid'}`} placeholder="Enter your username" name="username" value={username} onChange={(e) => onInputChange(e)} />
              {errors.username && <div className="invalid-feedback">{errors.username}</div>} {/* Added Here */}
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input type="text" className={`form-control ${errors.email && 'is-invalid'}`} placeholder="Enter your email" name="email" value={email} onChange={(e) => onInputChange(e)} />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>} {/* Added Here */}
            </div>
            <div class="mb-3">
              <label for="Role" class="form-label">Role</label>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {selectedRole}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleSelect('Principal')}>Principal</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSelect('Employee')}>Employee</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSelect('Admin')}>Admin</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
