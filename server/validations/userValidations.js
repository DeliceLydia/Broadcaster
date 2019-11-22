import joi from 'joi';

const validateSignup = {
    validation(signup) {
        const schema = {
            firstname: joi.string().trim().required(),
            lastname: joi.string().trim().required(),
            email: joi.string().email({ minDomainAtoms: 2 }).trim().required(),
            phoneNumber: joi.string().trim().required(),
            username: joi.string().trim().required(),
            password: joi.string().min(6).max(10).required(),
        };
        return joi.validate(signup, schema);
    }
}
    const validateSignin = {
        validation(returningUser) { 
            const schema = {
              email: joi.string().email().required(),
              password: joi.string().required(),
            };
            return joi.validate(returningUser, schema);
          }
        }
    export {
        validateSignup,
        validateSignin,
    }