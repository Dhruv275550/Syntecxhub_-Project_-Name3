const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Employee name is required"],
            trim: true,
            minlength: [2, "Name must contain at least 2 characters"],
            maxlength: [50, "Name cannot exceed 50 characters"]
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please enter a valid email address"
            ]
        },

        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
            match: [
                /^[6-9][0-9]{9}$/,
                "Please enter a valid 10-digit Indian phone number"
            ]
        },

        role: {
            type: String,
            required: [true, "Role is required"],
            trim: true
        },

        department: {
            type: String,
            required: [true, "Department is required"],
            trim: true
        },

        salary: {
            type: Number,
            required: [true, "Salary is required"],
            min: [0, "Salary cannot be negative"]
        },

        joiningDate: {
            type: Date,
            required: [true, "Joining date is required"]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Employee", employeeSchema);