const errorMiddleware = (err, req, res, next) => {
    console.error("ERROR:", err);

    // Duplicate email
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern || {})[0] || "field";

        return res.status(409).json({
            success: false,
            message: `${field} already exists`
        });
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map(
            (error) => error.message
        );

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors
        });
    }

    // Invalid ObjectId
    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid ID"
        });
    }

    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
};

module.exports = errorMiddleware;