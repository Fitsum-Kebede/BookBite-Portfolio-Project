const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Get the token from the request header
    const authHeader = req.header('Authorization');

    // Check if token is missing
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. Token missing.' });
    }

    // Extract the actual token from the "Bearer" format
    const token = authHeader.split(' ')[1];

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Add the decoded user information to the request
        req.user = decoded;

        // Move to the next middleware
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};
