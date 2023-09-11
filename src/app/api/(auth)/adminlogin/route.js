import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/user';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Connect to the database
      await dbConnect();

      // Find a user with the provided email and role 'admin'
      const user = await User.findOne({ email, role: 'admin' });

      if (user) {
        // In practice, you should hash and compare the password here
        // For simplicity, we're doing a basic password comparison
        if (user.password === password) {
          // Authentication successful
          res.status(200).json({ message: 'Admin login successful' });
        } else {
          // Authentication failed
          res.status(401).json({ message: 'Admin login failed' });
        }
      } else {
        // User not found
        res.status(401).json({ message: 'Admin login failed' });
      }
    } catch (error) {
      console.error('Error during admin login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}
