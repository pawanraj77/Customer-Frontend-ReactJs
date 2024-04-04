import { useState } from "react";
import employeeService from "../../services/EmployeeService";

function Login() {

    let [login, setLogin] = useState(
        {
            "email": '',
            "password": ''
        }
    )

    let [message, setMessage] = useState("");
    let [errorMessage, setErrorMessage] = useState("");

    const handleLoginChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent form reload
        console.log(login);
        employeeService.loginEmployee(login)
        .then(
            (resp) => {
                console.log(resp.data);
                setMessage("Employee Logged in successfully");
                setErrorMessage("");
            }
        )
        .catch(
            (err) => {
                console.log(err.response.data);
                setMessage("");
                setErrorMessage("Errors accured in following fields:" + JSON.stringify(err.respone.data));
            }
        )
    }


    return (
        <>
            <h3>Employee Login Page</h3>
            {
                message && <h3 className="alert alert-success">{message}</h3>
            }
            {
                errorMessage && <h3 className="alert alert-danger">{errorMessage}</h3>
            }

            <form onSubmit={handleSubmit}>
                <p>
                    Email: <input type="email" name="email" value={login.email} onChange={handleLoginChange} required></input>
                </p>
                <p>
                    Password: <input type="password" name="password" value={login.password} onChange={handleLoginChange} required></input>
                </p>
                <button type="submit">Submit</button>
            </form>
        </>
    )
    
}

export default Login;