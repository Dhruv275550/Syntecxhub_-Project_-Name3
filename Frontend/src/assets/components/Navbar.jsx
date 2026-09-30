import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    Employee Management System 
                </Link>

                <div className="navbar-links">
                    <Link to="/">Dashboard</Link>
                    <Link to="/employees">Employees</Link>
                    <Link to="/employees/add" className="add-button">
                        Add Employee
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;