import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./assets/components/Navbar";
import Dashboard from "./assets/Pages/Dashboard";
import Employees from "./assets/Pages/Employees";
import AddEmployee from "./assets/Pages/AddEmployee";
import EditEmployee from "./assets/Pages/EditEmployee";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <main>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/employees" element={<Employees />} />
                    <Route path="/employees/add" element={<AddEmployee />} />
                    <Route
                        path="/employees/edit/:id"
                        element={<EditEmployee />}
                    />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;