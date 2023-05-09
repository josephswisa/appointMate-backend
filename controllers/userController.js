const User = require('../models/usersModel')

//get all users as business
const getBusinesses = async (req , res) => {
    const businesses = await User.find({ userType: 'Business'}).sort({createdAt: -1})

    res.status(200).json(businesses)
}

//sign in
const getUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });

        if (!user) {
            // If no user is found with the given username/password, send a 401 Unauthorized status
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // If the user is found, send a 200 OK status with the user object
        res.status(200).json(user);
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error status with the error message
        res.status(500).json({ message: error.message });
    }
};


//create a user
const createUser = async (req, res) => {
    const {username, password, email, userType} = req.body

    try {
        const user = await User.create({username, password, email, userType})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createUser,
    getUser,
    getBusinesses
}