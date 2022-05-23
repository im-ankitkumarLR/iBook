import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })


    const navigate = useNavigate();  // For redrect
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {   // agar user valid hai or wo phle signup kr chuka hai to use login krke home page pe le aao or local storage me uska token stre krlo
            // Save the auth token and redirect 


            localStorage.setItem('token', json.authtoken);   // login  ke baad hum token ko save kr rhe hai or usee  nicche waali line me 24 redirect kr rhe hai
            props.showAlert("Loggedin Successfully", "success")
            navigate("/");// For redrect


        }
        else {
            props.showAlert("Invalid Details", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }




    return (
        <>

            <div className="mt-2 xyz1">
                <h2> Login To Continoue in iBook</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" />
                    </div>
                    <button type="submit" className="btn btn-warning">Login</button><br />
                    <small>Not have an account yet? <Link to="/signup">Signup</Link></small>
                </form>
            </div>

        </>

    )
}
export default Login;



















