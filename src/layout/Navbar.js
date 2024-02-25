import React from 'react' 
// if you type rfc and enter it will create the template component automatically
import { Link } from 'react-router-dom';

export default function Navbar() { 
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Abz's Full Stack App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className='btn btn-outline-light' to="/viewusers/ADMIN">View Admins</Link>
          <Link className='btn btn-outline-light' to="/viewusers/EMPLOYEE">View Employees</Link>
          <Link className='btn btn-outline-light' to="/adduser">Add User</Link>
        </div>
      </nav>
    </div>
  );
}
