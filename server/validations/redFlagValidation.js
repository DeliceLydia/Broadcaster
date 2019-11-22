import validator from 'validator';


class redFlagsvalidations {
  static postRedflag(req, res) {
    if (validator.isEmpty(req.body.title)) {
      throw Error('This Field title must not be empty');
    }
    if (validator.isNumeric(req.body.title)) {
      throw Error('This field title must be string');
    }
    if (validator.isEmpty(req.body.type)) {
      throw Error('This Field type must not be empty');
    }
    if (validator.isNumeric(req.body.type)) {
      throw Error('This field type must be string');
    }
    if (validator.isNumeric(req.body.status)) {
      throw Error('This field title must be string');
    }
    if (validator.isEmpty(req.body.status)) {
      throw Error('status field must not be empty');
    }
    if (validator.isEmpty(req.body.location)) {
      throw Error('This field location must not be empty');
    }
    if (!validator.isAlphanumeric(req.body.location)) {
      throw Error('This field location must be string');
    } 
    if (validator.isNumeric(req.body.comment)) {
      throw Error('This field title must be string');
    }
    if (validator.isEmpty(req.body.comment)) {
      throw Error('This field comment must not be empty');
    }
    if (!validator.isLength(req.body.comment, { min: 10, max: 250 })) {
      throw Error('comment is too short');
  }
  else {

    }
    return true;
  }
  static modifyLocation(req,res){
    if (validator.isEmpty(req.body.location)) {
      throw Error('This field location must not be empty');
    }
    if (!validator.isAlphanumeric(req.body.location)) {
      throw Error('This field location must be string');
    }else{

    }
    return true;
  }
  static modifyComment(req,res){
    if (validator.isEmpty(req.body.comment)) {
      throw Error('This field comment must not be empty');
    }
    if (!validator.isAlphanumeric(req.body.comment)) {
      throw Error('This field comment must be string');
    }
    if (!validator.isLength(req.body.comment, { min: 10, max: 250 })) {
      throw Error('comment is too short');
    }else{
 }
    return true;
  }
}
export default redFlagsvalidations;