import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddEmployee from './components/employee/AddEmployee';
import DisplayEmployees from './components/employee/DisplayEmployees';
import Layout from './components/Layout';
import Login from './components/employee/Login'

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>

            <Route path='/employee' element={<AddEmployee />}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/employees' element={<DisplayEmployees />}></Route>

            {/* <Route path='*' element={<NoPage />}></Route> */}
          </Route>
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
