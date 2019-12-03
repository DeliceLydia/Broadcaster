import joi from 'joi';

const validateRedFlag = {
    validation(redFlag) {
        const schema = {
            title : joi.string().trim().required(),
            type: joi.string().trim().required(),
            location: joi.string().trim().required(),
            comment: joi.string().min(6).max(100).required(),
            image: joi.optional(),
            video: joi.optional()
        };
        return joi.validate(redFlag, schema);
    }
}
const validateModify = {
    validation(newFlag) {
      const updateFlag = {
        title : joi.string().trim().optional(),
        type: joi.string().trim().optional(),
        location: joi.string().trim().optional(),
        comment: joi.string().min(6).max(100).optional(),
        image: joi.optional(),
        video: joi.optional()
      };
      return joi.validate(newFlag, updateFlag);
    },
  };
export {validateRedFlag, validateModify}