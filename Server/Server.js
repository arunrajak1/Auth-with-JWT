const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const secretKey = 'your-secret-key';
mongoose.connect('mongodb://127.0.0.1/userDB', { useNewUrlParser: true, useUnifiedTopology: true });//for dbconnect

const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String,
}));

app.post('/', async (req, res) => {
  const { name, email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email });
      await user.save();
      console.log('New user added:', user);
    } 
    else {
      console.log('User already exists:', user);
    }

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
