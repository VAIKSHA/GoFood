import React, { useState } from 'react'     // useState for state management
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
    const navigate = useNavigate() // for page navigate from register to login

    // state for storing user input data or value
    const [credentials, setcredentials] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: "",
    })

    // synthetic Event = e in callback function
    const handleSubmit = async (e) => {

        // prevent the form from refreshing or reloading the page when form is submit
        e.preventDefault();

        // checking all field is filled or not
        if (!credentials.name || !credentials.email || !credentials.password || !credentials.geolocation) {
            alert('Please fill all the fields');
            return;
        }

        try {
            // sending POST request to backend api to signup new user with their data
            const response = await fetch('https://gofood-grr4.onrender.com/api/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // content type to json bcz, we are sending json data
                },

                // convering JavaScript object into json string
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.geolocation,
                }),
            });

            // converting server's response into json format
            const json = await response.json();
            console.log(json);

            if (json.success) {
                alert('Registered Successfully!');
                navigate('/login');
            } else {
                alert('Error while registering');
            }
        }
        catch (error) {
            console.error(error);
            alert("Error occurred, please try again.");
        }
    };

    // onChange function updates the state when input field value change
    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value });
    };


    return (
        <div style={{background: 'linear-gradient(135deg, #adafb1ff 0%, #8394aeff 100%)', minHeight: '100vh', paddingTop: '0', marginTop: '-60px'}}>
            {/* For Navbar on Signup page */}
            <nav className="navbar navbar-expand-lg navbar-dark" style={{background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', boxShadow: '0 4px 20px rgba(0,0,0,0.15)'}}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/" style={{color: 'white'}}>🍽️ GoFood</Link>
                </div>
            </nav>
            <div className='container d-flex justify-content-center align-items-center' style={{minHeight: '90vh', paddingTop: '20px', paddingBottom: '20px'}}>
                <div className='card' style={{width: '450px', background: 'rgba(255,255,255,0.95)', borderRadius: '20px', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', backdropFilter: 'blur(10px)', border: 'none'}}>
                    <div className='card-body p-5'>
                        <h3 className='text-center mb-4' style={{color: '#333', fontWeight: 'bold'}}>Join GoFood!</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label" style={{color: '#555', fontWeight: '500'}}>Full Name</label>
                                <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} style={{borderRadius: '15px', padding: '12px 16px', border: '2px solid #e9ecef', fontSize: '16px'}} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label" style={{color: '#555', fontWeight: '500'}}>Email address</label>
                                <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" style={{borderRadius: '15px', padding: '12px 16px', border: '2px solid #e9ecef', fontSize: '16px'}} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label" style={{color: '#555', fontWeight: '500'}}>Password</label>
                                <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" style={{borderRadius: '15px', padding: '12px 16px', border: '2px solid #e9ecef', fontSize: '16px'}} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="exampleInputAddress" className="form-label" style={{color: '#555', fontWeight: '500'}}>Address</label>
                                <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id="exampleInputAddress" style={{borderRadius: '15px', padding: '12px 16px', border: '2px solid #e9ecef', fontSize: '16px'}} />
                            </div>

                            <button type="submit" className="btn w-100 mb-3" style={{background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', color: 'white', border: 'none', borderRadius: '15px', padding: '12px', fontSize: '16px', fontWeight: '500'}}>Sign Up</button>
                            <div className='text-center'>
                                <span style={{color: '#666'}}>Already have an account? </span>
                                <Link to="/login" style={{color: '#667eea', textDecoration: 'none', fontWeight: '500'}}>Sign In</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
