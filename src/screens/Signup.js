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
            const response = await fetch('http://localhost:4000/api/createuser', {
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
        <>
            {/* For Navbar on Signup page */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
                </div>
            </nav>
            <div className='container mt-5'>
                {/* onSubmit for connecting with bankend */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                        <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id="exampleInputAddress" />
                    </div>

                    <button type="submit" className="m-3 btn btn-success">Sign up</button>
                    <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
                </form>
            </div>
        </>
    )
}
