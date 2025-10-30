import React, { useState }from 'react'
import { Link, useNavigate, } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';



export default function Navs() {

    const [cartView, setCartView] = useState(false)
    let data = useCart();
    const navigate = useNavigate();

    const handleCheckOut = ()=>{
        localStorage.removeItem("authToken");
        navigate("/login")
    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{
                position: 'fixed', 
                top: 0, 
                width: '100%', 
                zIndex: 1000,
                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
            }}>
                <div className="container-fluid px-4">
                    <Link className="navbar-brand" to="/" style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: 'white',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        fontStyle: 'italic'
                    }}>🍽️ GoFood</Link>
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/" style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '500',
                                    color: 'white',
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    transition: 'all 0.3s ease'
                                }} onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'} onMouseLeave={(e) => e.target.style.background = 'transparent'}>Home</Link>
                            </li>
                            {(localStorage.getItem("authToken"))
                                ?
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/myOrder" style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '500',
                                        color: 'white',
                                        padding: '8px 16px',
                                        borderRadius: '20px',
                                        transition: 'all 0.3s ease'
                                    }} onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'} onMouseLeave={(e) => e.target.style.background = 'transparent'}>My Orders</Link>
                                </li>
                                : ""
                            }
                        </ul>
                        {(!localStorage.getItem("authToken"))
                            ?
                            <div className='d-flex gap-2'>
                                <Link className="btn btn-outline-light mx-1" to="/login" style={{borderRadius: '20px', padding: '8px 20px'}}>Login</Link>
                                <Link className="btn btn-light mx-1" to="/createuser" style={{borderRadius: '20px', padding: '8px 20px', color: '#28a745'}}>Signup</Link>
                            </div>
                            :
                            <div className='d-flex gap-2 align-items-center'>
                                <div className='btn btn-outline-light mx-1' onClick={()=>{setCartView(true)}} style={{borderRadius: '20px', padding: '8px 16px'}}>
                                    My Cart{" "}
                                    {data.length > 0 && (<Badge pill bg="danger"> {data.length} </Badge>)}
                                </div>

                                {cartView ? <Modal onClose={()=>{setCartView(false)}}><Cart/></Modal> : null}

                                <div className='btn btn-danger mx-1' onClick={handleCheckOut} style={{borderRadius: '20px', padding: '8px 16px'}}>Logout</div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}
