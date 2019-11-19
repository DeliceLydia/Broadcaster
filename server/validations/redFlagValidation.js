import joi from 'joi';

const validateRedFlag = {
    validation(redFlag) {
        const schema = {
            title : joi.string().trim().required(),
            type: joi.string().trim().required(),
            location: joi.string().trim().required(),
            status: joi.string().trim().required(),
            comment: joi.string().min(6).max(100).required(),
            image: joi.required(),
            video: joi.optional()
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
  const validateComment = {
    validation(newComment) {
      const updateComment = {
        comment: joi.string().required(),
      };
      return joi.validate(newComment, updateComment);
    },
  };
export {validateRedFlag, validateLocation, validateComment}