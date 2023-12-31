const express = require('express');
const server = express();
const port = process.env.PORT || 3000

server.use(express.json());

const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('connected');
}

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('user', userSchema);

server.post('/demo', async (req, res) => {
  let user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  const doc = await user.save();
  console.log(doc);
  res.json(doc);
});

server.listen(port, () => {
  console.log('server started');
});
