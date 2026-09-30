require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const employeeRoutes = require("./Routes/employeeRoutes");
const errorMiddleware = require("./middleware/errormiddleware");

const app = express();


app.use(
    cors({
       origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5175",
    "http://127.0.0.1:5175"
],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"]
    })
);

app.use(express.json());



app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Employee Management API is running"
    });
});



app.use("/api/employees", employeeRoutes);


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found"
    });
});


app.use(errorMiddleware);



const PORT = process.env.PORT || 4000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT,() => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed.");
        process.exit(1);
    }
};

startServer();