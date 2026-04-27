import React from 'react';
import TypeWriter from './TypeWriter';
import Magnet from './Magnet';



function Header() {
  return (
    <header>
      <div className="header-container">
        <div className="github">
          <Magnet>
            <a href="https://github.com/ParkerPeterman" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
          </Magnet> 
        </div>
        <h1 className="user-name">Parker Peterman</h1>
        <div className="linkedin">
          <Magnet>
            <a href="https://www.linkedin.com/in/parker-peterman-a17430347/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          </Magnet>
        </div>
      </div>
      <h3>
        <em>Maize, Kansas</em> || <em>(316) 680-5045</em> || <em>petermanparker6@gmail.com</em>
      </h3>
      <TypeWriter />
    </header>
  );
}

export default Header;