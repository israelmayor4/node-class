import express from 'express';
import { registerUser } from '../controllers/user.js';
import { loginUser } from '../controllers/user.js';

const route = express.Router();

route.post('/register', registerUser);
route.post('/login', loginUser);

export default route;