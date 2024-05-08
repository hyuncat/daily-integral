import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/daily_integral_nav.png" alt="daily-integral" className="title-image" style={{ height: '50px' }} />
        <a className="navbar-brand" href="/">daily-integral</a>
      </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="/">home</a>
            <a className="nav-link" href="/leaderboard">leaderboard</a>
          </div>
          <div className="navbar-nav ms-auto"> 
            <a className="nav-link" href="/login">login</a>
            <a className="nav-link" href="/signup">sign up</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
