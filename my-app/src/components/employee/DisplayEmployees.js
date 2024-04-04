import { useState } from "react";
import employeeService from "../../services/EmployeeService";
import { useEffect } from "react";



function UpdateEmployee({ employee, onUpdateCompletion }) {
    let [message, setMessage] = useState("");
    let [errorMessage, setErrorMessage] = useState("");


    let [updateEmployee, setUpdateEmployee] = useState(employee); // assign incoming props to component state

    const handleEmployeeChange = (e) => {
        setUpdateEmployee({ ...employee, [e.target.name]: e.target.value });

    }


    const handleUpdate = (e) => {
        e.preventDefault();

        console.log(updateEmployee);
        employeeService.updateEmployee(updateEmployee)
            .then(
                (resp) => {
                    console.log(resp.data);
                    setMessage("Employee Updated success!");
                    setErrorMessage("");
                   //onUpdateCompletion();// set isUpdate to false
                }
            )
            .catch(
                (err) => {
                    console.log(err.response.data);
                    setMessage("");
                    //setErrorMessage("Errors accured in fallowing fields:" + JSON.stringify(err.response.data));
                    setErrorMessage("Could not update !");
                }
            )


    }

    return (
        <>
            <h3>Update Employee:</h3>
            {
                message && <h3 className="alert alert-success">{message}</h3>
            }
            {
                errorMessage && <h3 className="alert alert-danger">{errorMessage}</h3>
            }


            <form onSubmit={handleUpdate}>
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
                    Email: <input type="email" name="email" value={employee.email} onChange={handleEmployeeChange} required disabled></input>
                </p>
                <p>
                    Password: <input type="password" name="password" value={employee.password} onChange={handleEmployeeChange} required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters" disabled></input>
                </p>
                <p>
                    City: <input type="text" name="city" value={employee.city} onChange={handleEmployeeChange} required pattern="[a-zA-Z ]{1,15}" title="City should contain min 1 & max 15 chars , no digits and special chars allowed."></input>
                </p>
                <button type="submit">Update</button>
                <button onClick={onUpdateCompletion}>Back</button>

            </form>
        </>
    )
}

function EmployeesTable({ employeeArray, handleDelete, handleUpdate }) {

    console.log(employeeArray);

    return (
        <>
            <h3>Display All Employees:</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone no</th>
                        <th>Email</th>
                        {/* <th>Password</th> */}
                        <th>City</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        employeeArray.map(
                            (employee) =>
                            (<tr key={employee.cdsId}>
                                <td>{employee.cdsId}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.phoneNo}</td>
                                <td>{employee.email}</td>
                                {/* <td>{employee.password}</td> */}
                                <td>{employee.city}</td>
                                <td>{employee.issues}</td>
                                
                                <td><button onClick={() => handleDelete(employee.cdsId)}>Delete</button></td>

                                <td><button onClick={() => handleUpdate(employee)}>Update</button></td>
                            </tr>)


                        )
                    }

                </tbody>
            </table>

        </>
    )

}

function DisplayEmployees() {


    let [employees, setEmployees] = useState([]);
    let [isUpdate, setIsUpdate] = useState(false);
    let [updateEmployee, setUpdateEmployee] = useState({});


    useEffect(() => {
        //Runs only on the first render
        loadAllData();
    }, []);

    const loadAllData = () => {

        employeeService.getAllEmployees()
            .then(
                (resp) => {
                    console.log(resp.data);
                    // employees =  resp.data;
                    setEmployees(resp.data);
                }
            )
            .catch(
                (err) => {
                    console.log(err);
                }
            )
            .finally(
                () => {
                    console.log("Loaded all data from Server");
                }
            )
    }

    // loadAllData();

    const handleDelete = (id) => {
        console.log(id);
        employeeService.deleteEmployeeById(id)
            .then(
                (resp) => {
                    console.log(resp);
                    setEmployees(employees.filter((a) => a.id !== id))
                }
            )
            .catch(
                (err) => {
                    console.log(err);
                }
            )
    }

    const handleUpdate = (updateEmployee) => {
        console.log(updateEmployee);
        setUpdateEmployee(updateEmployee);
        setIsUpdate(true);

    }

    return (
        <>

            {
                isUpdate ? <UpdateEmployee employee={updateEmployee} onUpdateCompletion={() => { setIsUpdate(false); loadAllData() }}></UpdateEmployee> :


                    employees.length > 0 ? <EmployeesTable employeeArray={employees} handleDelete={handleDelete} handleUpdate={handleUpdate} /> : <h3> No Employees found.</h3>
            }
        </>
    );
}

export default DisplayEmployees;