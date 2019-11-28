import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {validateSignup} from '../validations/userValidations';
import {findUser, findUsername} from '../models/userModels';
import users from '../data/usersData';
import findId from '../helpers/helpers';
import responseMessage from '../helpers/response';

dotenv.config();

class Users {
    static signup(req,res) {
            const { error } = validateSignup.validation(req.body);
            if (error) {return responseMessage.errorMessage(res, 400, 'you are not allowed to post check your entry!');}
            const user = findUser(req.body.email);
            if (user) {
                return responseMessage.errorMessage(res, 400, 'Email already exist');
                }
            const checkUsername = findUsername(req.body.username)
            if(checkUsername) {
                return responseMessage.errorMessage(res, 400, 'username already exist'); 
            }
                const hash = bcrypt.hashSync(req.body.password.trim(),10); 
                const id = findId;
                const{firstname, lastname, email, phoneNumber, username} = req.body;
                const newUser = {id, firstname, lastname, email, phoneNumber, username, password: hash};
                const payload = {id: newUser.id, email: newUser.email}
                const token = jwt.sign(payload, 'SECRET_KEY', { expiresIn: '24hrs' });
                users.push(newUser);
                return responseMessage.successWithData(res, 201, 'User created successfully',token, { firstname, lastname, email,phoneNumber, username});
    }
    static signin(req,res) {
            const user = findUser(req.body.email)
            if(!user) {return responseMessage.errorMessage(res, 400, 'incorrect email or password');}
            
            const password = bcrypt.compareSync(req.body.password.trim(), user.password);
            if(!password) {return responseMessage.errorMessage(res, 400, 'incorrect email or password');}
    
            const payload = {id: user.id, email: user.email}
            const token = jwt.sign(payload, 'SECRET_KEY', { expiresIn: '1d' });
            return responseMessage.successWithData(res, 200, 'User is successfully logged in!', token,
             {firstname: user.firstname, lastname: user.lastname, email: user.email, phoneNumber: user.phoneNumber, username: user.username });
  }
}
export default Users;
  