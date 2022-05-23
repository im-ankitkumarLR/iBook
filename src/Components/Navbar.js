import React from 'react'
import { Link ,useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

 

const Navbar = () => {

  const navigate = useNavigate();

  let location = useLocation();
  const handleLogout =()=>{
  
    localStorage.removeItem('token');
    navigate('/login')


  }

 


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <Link className="navbar-brand" to="/">iBook</Link>
     <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"? "active":""}`} to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"? "active":""}`}to="/about">About</Link>
        </li>
        
      </ul>
      {!localStorage.getItem('token')?
      <form className="d-flex">
      <Link className="btn btn-warning mx-2"  to="/login" role="button">Login</Link>
      <Link className="btn btn-warning mx-2"  to="/signup" role="button">Signup</Link>
      </form>:<button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
    </div>
  </div>
</nav>
    )
}

export default Navbar