import validator from 'validator';

class userValidations {
    static validateSignup(req, res) {

        if (!typeof req.body.firstname === 'string') {
            throw Error('firstname must be string');
        }
        if (validator.isEmpty(req.body.firstname)) {
            throw Error('firstname is required');
        }
        if (!validator.isAlphanumeric(req.body.firstname)) {
            throw Error('firstname must not contain special characters');
        }
        if (validator.isNumeric(req.body.firstname)) {
            throw Error('firstname must be string');
        }
        if (validator.isEmpty(req.body.lastname)) {
            throw Error('lastname is required');
        }
        if (validator.isNumeric(req.body.lastname)) {
            throw Error('lastname must be string');
        }
        if (!validator.isAlphanumeric(req.body.lastname)) {
            throw Error('lastname must not contain special characters');
        }
        if (typeof req.body.email === 'number') {
            throw Error('your email must look like  this ex:lydia@gmail.com');
        }
        if (validator.isEmpty(req.body.email)) {
            throw Error('email is required');
        }
        if (!validator.isEmail(req.body.email)) {
            throw Error('your email must look like  this ex:lydia@gmail.com');
        }
        if (validator.isEmpty(req.body.phoneNumber)) {
            throw Error('phoneNumber is required');
        }
        if (!validator.isNumeric(req.body.phoneNumber)) {
            throw Error('phoneNumber must be a number');
        }
        if (!validator.isAlphanumeric(req.body.phoneNumber)) {
            throw Error('phoneNumber must not contain special characters');
        }
        if (!validator.isLength(req.body.phoneNumber, { min: 8, max: 10 })) {
            throw Error('phoneNumber is too short');
        }
        if (validator.isEmpty(req.body.username)) {
            throw Error('username is required');
        }
        if (validator.isNumeric(req.body.username)) {
            throw Error('username must be string');
        }
        if (!validator.isAlphanumeric(req.body.username)) {
            throw Error('username must not contain special characters');
        }
        if (validator.isEmpty(req.body.password)) {
            throw Error('password is required');
        }
        if (!validator.isLength(req.body.password, { min: 6, max: 250 })) {
            throw Error('password is too short');
        }
        if (validator.isAlphanumeric(req.body.password)) {
            throw Error('password must contain some special characters');
        } else {

        }
        return true;
    }
    static validatesignin(req, res) {
        if (typeof req.body.email === 'number') {
            throw Error('your email must look like  this ex:lydia@gmail.com');
        }
        if (validator.isEmpty(req.body.email)) {
            throw Error('email is required');
        }
        if (!validator.isEmail(req.body.email)) {
            throw Error('your email must look like  this ex:lydia@gmail.com');
        }
        if (validator.isEmpty(req.body.password)) {
            throw Error('password is required');
        } else {

        }
        return true;
    }
}
export default userValidations;

