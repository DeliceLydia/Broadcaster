import joi from 'joi';

const validateRedFlag = {
    validation(redFlag) {
        const schema = {
            title : joi.string().trim().required(),
            type: joi.string().trim().required(),
            location: joi.string().trim().required(),
            status: joi.string().trim().required(),
            // images: joi.required(),
            comment: joi.string().min(6).max(100).required()
        };
        return joi.validate(redFlag, schema);
    }
}
const validateLocation = {
    validation(newLocation) {
      const updateLocation = {
        location: joi.string().required(),
      };
      return joi.validate(newLocation, updateLocation);
    },
  };
export {validateRedFlag, validateLocation}