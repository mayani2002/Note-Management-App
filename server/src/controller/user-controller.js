import { User } from '../model/index.js'; // Assuming you have a User model defined

// Controller for user signup
export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the username already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Create a new user
        const newUser = await User.create({ username: username, email: email, password: password });

        // Return the newly created user
        return res.status(201).json({ message:"success",result: newUser});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller for user login
export const login = async (req, res) => {
    try {
        console.log("\n\neq.query: ", req.body);
        const { username, password } = req.body;
        console.log("usename: ", username, "password: ", password);
        // Find the user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password is correct
        console.log("user.password: ", user.password);
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        
        // Return a success message or token
        return res.status(200).json({ message: 'Login successful', result: user});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


