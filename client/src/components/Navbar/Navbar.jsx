import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">daily-integral</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="#">home</a>
            <a className="nav-link" href="#">leaderboard</a>
          </div>
          <div className="navbar-nav ms-auto"> 
            <a className="nav-link" href="#">login</a>
            <a className="nav-link" href="#">sign up</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
