import express from 'express';
import Users from '../controllers/usersController';

const user_router = express.Router();

user_router.post('/api/v1/auth/signup', Users.signup);
user_router.post('/api/v1/auth/signin', Users.signin);

export default user_router;