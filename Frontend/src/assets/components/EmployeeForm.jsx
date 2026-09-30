import { useEffect, useState } from "react";

const initialForm = {
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    salary: "",
    joiningDate: ""
};

function EmployeeForm({
    initialData = initialForm,
    onSubmit,
    submitText = "Save Employee",
    loading = false
}) {
    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                email: initialData.email || "",
                phone: initialData.phone || "",
                role: initialData.role || "",
                department: initialData.department || "",
                salary: initialData.salary ?? "",
                joiningDate: initialData.joiningDate
                    ? initialData.joiningDate.substring(0, 10)
                    : ""
            });
        }
    }, [initialData]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: ""
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Name must contain at least 2 characters";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[6-9][0-9]{9}$/.test(formData.phone)) {
            newErrors.phone = "Enter a valid 10-digit Indian phone number";
        }

        if (!formData.role.trim()) {
            newErrors.role = "Role is required";
        }

        if (!formData.department.trim()) {
            newErrors.department = "Department is required";
        }

        if (formData.salary === "") {
            newErrors.salary = "Salary is required";
        } else if (Number(formData.salary) < 0) {
            newErrors.salary = "Salary cannot be negative";
        }

        if (!formData.joiningDate) {
            newErrors.joiningDate = "Joining date is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        onSubmit({
            ...formData,
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            phone: formData.phone.trim(),
            role: formData.role.trim(),
            department: formData.department.trim(),
            salary: Number(formData.salary)
        });
    };

    return (
        <form className="employee-form" onSubmit={handleSubmit}>

            <div className="form-grid">

                <div className="form-group">
                    <label htmlFor="name">Full Name</label>

                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter employee name"
                    />

                    {errors.name && (
                        <p className="field-error">{errors.name}</p>
                    )}
                </div>


                <div className="form-group">
                    <label htmlFor="email">Email</label>

                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                    />

                    {errors.email && (
                        <p className="field-error">{errors.email}</p>
                    )}
                </div>


                <div className="form-group">
                    <label htmlFor="phone">Phone</label>

                    <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit phone number"
                        maxLength="10"
                    />

                    {errors.phone && (
                        <p className="field-error">{errors.phone}</p>
                    )}
                </div>


                <div className="form-group">
                    <label htmlFor="role">Role</label>

                    <input
                        id="role"
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="e.g. Software Engineer"
                    />

                    {errors.role && (
                        <p className="field-error">{errors.role}</p>
                    )}
                </div>


                <div className="form-group">
                    <label htmlFor="department">Department</label>

                    <input
                        id="department"
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="e.g. IT"
                    />

                    {errors.department && (
                        <p className="field-error">{errors.department}</p>
                    )}
                </div>


                <div className="form-group">
                    <label htmlFor="salary">Salary</label>

                    <input
                        id="salary"
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="Enter salary"
                        min="0"
                    />

                    {errors.salary && (
                        <p className="field-error">{errors.salary}</p>
                    )}
                </div>


                <div className="form-group">
                    <label htmlFor="joiningDate">Joining Date</label>

                    <input
                        id="joiningDate"
                        type="date"
                        name="joiningDate"
                        value={formData.joiningDate}
                        onChange={handleChange}
                    />

                    {errors.joiningDate && (
                        <p className="field-error">{errors.joiningDate}</p>
                    )}
                </div>

            </div>

            <button
                type="submit"
                className="primary-button"
                disabled={loading}
            >
                {loading ? "Saving..." : submitText}
            </button>

        </form>
    );
}

export default EmployeeForm;