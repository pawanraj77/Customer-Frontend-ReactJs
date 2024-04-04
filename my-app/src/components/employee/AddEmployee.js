import { useState } from "react";
import employeeService from "../../services/EmployeeService";

function AddEmployee() {
    let [employee, setEmployee] = useState({
        "firstName": '',
        "lastName" : '',
        "phoneNo" : '',
        "email": '',
        "password": '',
        "city":  ''
    });

    let [message, setMessage] = useState("");
    let [errorMessage, setErrorMessage] = useState("");


    const handleEmployeeChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(employee);
        employeeService.addEmployee(employee)
            .then(
                (resp) => {
                    console.log(resp.data);
                    setMessage("Employee Registered successfully!");
                    setErrorMessage("");
                }
            )
            .catch(
                (err) => {
                    console.log(err.response.data);
                    setMessage("");
                    setErrorMessage("Errors accured in following fields:" + JSON.stringify(err.response.data));
                }
            )


    }
    return (
        <>
            <h3>Register Employee:</h3>

            {
                message && <h3 className="alert alert-success">{message}</h3>
            }
            {
                errorMessage && <h3 className="alert alert-danger">{errorMessage}</h3>
            }


            <form onSubmit={handleSubmit}>
                <p>
                    First Name: <input type="text" name="firstName" value={employee.firstName} onChange={handleEmployeeChange}    required pattern="[a-zA-Z ]{3,16}" title="First Name should contain min 3 & max 16 chars , no digits and special chars allowed."></input>
                </p>
                <p>
                    Last Name: <input type="text" name="lastName" value={employee.lastName} onChange={handleEmployeeChange}    required pattern="[a-zA-Z ]{1,16}" title="Last Name should contain min 1 & max 16 chars , no digits and special chars allowed."></input>
                </p>
                <p>
                    Phone No: <input type="number" name="phoneNo" value={employee.phoneNo} onChange={handleEmployeeChange}    required pattern="[0-9]{10,10}" title="Phone no. should contain exact 10 digits"></input>
                </p>

                <p>
                    Email: <input type="email" name="email" value={employee.email} onChange={handleEmployeeChange} required></input>
                </p>
                <p>
                    Password: <input type="password" name="password" value={employee.password} onChange={handleEmployeeChange} required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"></input>
                </p>
                <p>
                    City: <input type="text" name="city" value={employee.city} onChange={handleEmployeeChange} required pattern="[a-zA-Z ]{1,15}" title="City should contain min 1 & max 15 chars , no digits and special chars allowed."></input>
                </p>
                <button type="submit">Add Employee</button>
            </form>
        </>
    );
}

export default AddEmployee; 