import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {validateSignup,validateSignin} from '../validations/userValidations';
import users from '../models/usersModel';
import responseMessage from '../helpers/response';

dotenv.config();

class Users {
    static signup(req,res) {
            const { error } = validateSignup.validation(req.body);
            if (error) {
                return responseMessage.errorMessage(res, 400, error.details[0].message);
            }
            const user = users.find(u => u.email === req.body.email);
            if (user) {
                return responseMessage.errorMessage(res, 401, 'Email already exist');
                }
                const hash = bcrypt.hashSync(req.body.password.trim(),10);
                const id = parseInt(users.length + 1);
                const{firstname, lastname, email, phoneNumber, username} = req.body;
                const newUser = {id, firstname, lastname, email, phoneNumber, username, password: hash};
                const payload = {
                    id: newUser.id,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    email: newUser.email
                }
                const token = jwt.sign(payload, 'SECRET_KEY', { expiresIn: '24hrs' });
                users.push(newUser);
                return responseMessage.successWithData(res, 201, 'User created successfully', {token});
    }
    static signin(req,res) {
        const { error } = validateSignin.validation(req.body);
            if (error) {
                return responseMessage.errorMessage(res, 400, error.details[0].message);}
            const user = users.find(u => u.email === req.body.email);
            
            if(!user) {return responseMessage.errorMessage(res, 400, 'incorrect email or password');}
            const password = bcrypt.compareSync(req.body.password.trim(), user.password);
            
            if (!password) {
            return responseMessage.errorMessage(res, 400, 'incorrect email or password');}
    const payload = {id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email}
    const token = jwt.sign(payload, 'SECRET_KEY', { expiresIn: '1d' });
    return responseMessage.successWithData(res, 200, 'User is successfully logged in!', {token});
  }
}
export default Users;