import { axiosInstance } from "./axios-http-client";

class EmployeeService {
    addEmployee(employee){
    return axiosInstance.post('http://localhost:8090/employee', employee);
    }
    getAllEmployees(){
    return axiosInstance.get('http://localhost:8090/employees');
    }
    loginEmployee(login){
    return axiosInstance.post('http://localhost:8090/employee/login', login);
    }
    deleteEmployeeById(cdsId){
    return axiosInstance.delete('http://localhost:8090/employee/'+ cdsId);
    }
    updateEmployee(employee){
    return axiosInstance.put('http://localhost:8090/employee', employee)
    }
}

export default new EmployeeService();