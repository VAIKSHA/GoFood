import React, { useState } from 'react'      // useState for state management
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();   // for page navigate from login to home

  // state to manage entered data or value
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  })

  // synthetic Event = e in callback function
  const handleSubmit = async (event) => {

    // prevent the form from refreshing or reloading the page when form is submit
    event.preventDefault();

    // checking all field is filled or not
    if (!credentials.email || !credentials.password) {
      alert("Please fill in both fields!");
      return;
    }

    try {
      // request to the backend to verify login credentials
      const response = await fetch("http://localhost:4000/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        // convering JavaScript object into json string
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      // converting server's response into json format
      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem("userEmail", credentials.email)
        // alert("Login Successful!");
        localStorage.setItem("authToken", json.authToken)
        // console.log(localStorage.getItem("authToken"))  // for token generating in console
        navigate('/');
      }
      else {
        alert(json.error || "Invalid Credentials!");
      }
    }
    catch (err) {
      console.error(err);
      alert("Error occurred, please try again.");
    }
  };

  // onChange function updates the state when input field value change
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <div>
      {/* For Navbar on Login page */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
        </div>
      </nav>
      <div className='container mt-5'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
          </div>
          <button type="submit" className="m-3 btn btn-success">Log In</button>
          <Link to="/createuser" className='m-3 btn btn-danger'>New User</Link>
        </form>
      </div>
    </div>
  )
}
