const validateEmployee = (req, res, next) => {
    const {
        name,
        email,
        phone,
        role,
        department,
        salary,
        joiningDate
    } = req.body;

    if (!name || !email || !phone || !role || !department || salary === undefined || !joiningDate) {
        return res.status(400).json({
            success: false,
            message: "All employee fields are required"
        });
    }

    next();
};

module.exports = validateEmployee;