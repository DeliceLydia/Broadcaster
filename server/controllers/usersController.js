import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {validateSignup} from '../validations/userValidations';
import responseMessage from '../helpers/response';
import sql from '../helpers/usersQuery';
import pool from '../config/connect';

dotenv.config();

class Users {
    static async admin(req, res) {
      
        const { error } = validateSignup.validation(req.body);
        if (error) {
            const message = error.details.map(item => item.message.replace(/"/g, '')).join(', ');
            return responseMessage.errorMessage(res, 400,  message);}
        const emailValue= req.body.email;
        const userEmail = await pool.query(sql.findUser, [emailValue]);
        if (userEmail.rows[0]) {
            return responseMessage.errorMessage(res, 400, 'Email already exist');
        }
        const usernameValue = req.body.username;
        const checkUsername =  await pool.query(sql.findUsername, [usernameValue]);
        if(checkUsername.rows[0]) {
            return responseMessage.errorMessage(res, 400, 'username already exist'); 
        }
        const numberValue = req.body.phoneNumber;
        const checkNumber =  await pool.query(sql.findNumber, [numberValue]);
        if(checkNumber.rows[0]) {
            return responseMessage.errorMessage(res, 400, 'phoneNumber already exist'); 
        }
            const hash = bcrypt.hashSync(req.body.password.trim(),10);
            const is_admin = true;
            const{firstname, lastname, username, phoneNumber, email} = req.body;
            const admin = {firstname, lastname,  username, phoneNumber, email, password: hash, is_admin};
            const result = await pool.query(sql.addAdmin, [admin.firstname, admin.lastname, admin.username, admin.phoneNumber, admin.email, admin.password, admin.is_admin]);
            const payload = {id: result.rows[0].id, email: result.rows[0].email, is_admin};
            const token = jwt.sign(payload, 'SECRET_KEY', { expiresIn: '24hrs' });
            return responseMessage.successWithData(res, 201, 'admin created successfully',token, {email}) 
    }
    static async signup(req,res) {
            const { error } = validateSignup.validation(req.body);
            if (error) {
                const message = error.details.map(item => item.message.replace(/"/g, '')).join(', ');
                return responseMessage.errorMessage(res, 400,  message);}
            const emailValue= req.body.email;
            const userEmail = await pool.query(sql.findUser, [emailValue]);
            if (userEmail.rows[0]) {
                return responseMessage.errorMessage(res, 400, 'Email already exist');
            }
            const usernameValue = req.body.username;
            const checkUsername =  await pool.query(sql.findUsername, [usernameValue]);
            if(checkUsername.rows[0]) {
                return responseMessage.errorMessage(res, 400, 'username already exist'); 
            }
            const numberValue = req.body.phoneNumber;
            const checkNumber =  await pool.query(sql.findNumber, [numberValue]);
            if(checkNumber.rows[0]) {
                return responseMessage.errorMessage(res, 400, 'phoneNumber already exist'); 
            }
                const hash = bcrypt.hashSync(req.body.password.trim(),10);
                const{firstname, lastname, username, phoneNumber, email} = req.body;
                const newUser = {firstname, lastname,  username, phoneNumber, email, password: hash};
                const result = await pool.query(sql.addUser, [newUser.firstname, newUser.lastname, newUser.username, newUser.phoneNumber, newUser.email, newUser.password]);
                const payload = {id: result.rows[0].id, email: result.rows[0].email}
                const token = jwt.sign(payload, 'SECRET_KEY', { expiresIn: '24hrs' });
                return responseMessage.successWithData(res, 201, 'User created successfully',token, { firstname, lastname, username, phoneNumber, email});
    }
    static async signin(req,res) {
            const userEmail = req.body.email
            const {rows} = await pool.query(sql.findUser, [userEmail]);
            if(!rows[0]) {return responseMessage.errorMessage(res, 400, 'incorrect email or password');}
            
            const password = bcrypt.compareSync(req.body.password.trim(), rows[0].password);
            if(!password) {return responseMessage.errorMessage(res, 400, 'incorrect email or password');}
            const {id, firstname, lastname, username, phoneNumber, email} = rows[0];
            const payload = {id: rows[0].id, email: rows[0].email}
            const token = jwt.sign(payload, 'SECRET_KEY', { expiresIn: '1d' });
            return responseMessage.successWithData(res, 200, 'User is successfully logged in!', token,
             {firstname, lastname, username, phoneNumber, email});
  }
}
export default Users;