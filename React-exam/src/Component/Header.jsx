import React from 'react'
import { Link } from 'react-router-dom'
import { FaEye, FaPlus } from "react-icons/fa";

function Header() {
    return (
        <>
            <nav className="navbar navbar-expand-lg d-flex align-items-center position-fixed navbar-light"  style={{ top:"0",right:"0" }}>

                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0 ">
                            <li className="nav-item me-2">
                                <Link to="/" className="nav-link active" aria-current="page" href="#" style={{backgroundColor:"black",borderRadius:"50%",color:"white",padding:"4px",border:"1px solid black",width:"40px",height:"40px",textAlign:"center",fontSize:"18px"}}><FaPlus/></Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/view" className="nav-link active" aria-current="page" href="#" style={{backgroundColor:"black",borderRadius:"50%",color:"white",padding:"4px",border:"1px solid black",width:"40px",height:"40px",textAlign:"center",fontSize:"18px"}}><FaEye/></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header