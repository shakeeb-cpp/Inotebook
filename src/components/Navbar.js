import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'


const Navbar = () => {

    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login")
    }


    // This is used to make the home active when we are in home page and as well as about to make it active when we are in about page
    let location = useLocation();


    return (
        <nav className="navbar navbar-expand-lg bg-black navbar-dark fixed-top">
            <div className="container-fluid">

                <img className='me-2' src="https://cdn-icons-png.flaticon.com/256/6857/6857427.png" height={50} alt="..." />
                <Link to="/" className="navbar-brand">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ""}`} aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="about" className={`nav-link ${location.pathname === '/about' ? 'active' : ""}`}>About Us</Link>
                        </li>
                    </ul>

                    {!localStorage.getItem('token') ?
                        <form className="d-flex px-md-2 py-1" role="search">
                            {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                            <Link to='/login' className="btn btn-outline-info me-2 py-1 px-3" role="button">Login</Link>
                            <Link to='/signup' className="btn btn-outline-primary py-1 px-3" role="button">SignUp</Link>
                        </form>
                        : <button onClick={handleLogout} className="btn btn-outline-primary py-1 px-3 me-2">Logout</button>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
