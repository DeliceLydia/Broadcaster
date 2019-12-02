import joi from 'joi';

const validateSignup = {
    validation(signup) {
        const schema = {
            firstname: joi.string().trim().required(),
            lastname: joi.string().trim().required(),
            email: joi.string().email({ minDomainAtoms: 2 }).trim().required(),
            phoneNumber: joi.number().required(),
            username: joi.string().min(4).max(6).trim().required(),
            password: joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).trim().required(),
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