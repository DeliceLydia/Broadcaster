import { validateRedFlag, validateLocation, validateComment } from '../validations/redFlagValidation';
import responseMessage from '../helpers/response';
import moment from 'moment';
import redFlags from '../data/redFlagData';


class RedFlags {
  static postRedFlag(req, res) {
    const { error } = validateRedFlag.validation(req.body);
    if (error) { return responseMessage.errorMessage(res, 400, 'you are not allowed to post check your entry'); }

    const redFlagId = redFlags.length + 1;
    const { title, type, location, comment,status, image, video} = req.body;
    const redFlag = { redFlagId, created_on: moment().format('LL'), title, type, comment, createdBy: req.user.email, location, status, image, video };
    redFlags.push(redFlag);
    return responseMessage.successWithData(res, 201, 'Created red flag record', { redFlagId });
  }

  // GetAll//
  static getAll(req, res) {
    if (!redFlags) { return responseMessage.errorMessage(res, 404, 'no red flags found'); }
    else { return responseMessage.successUser(res, 200, redFlags); }
  }

  // GetOne//
  static getOne(req, res) {
    const redFlagId = redFlags.find(h => h.redFlagId === parseInt(req.params.redFlagId));
    if (!redFlagId) { return responseMessage.errorMessage(res, 404, 'red flag not found') }
    else { return responseMessage.successUser(res, 200, redFlagId); }
  }

  // Update Location //
  static updateLocation(req, res) {
    const { error } = validateLocation.validation(req.body);
    if (error) { return responseMessage.errorMessage(res, 400,'you are not allowed to modify check your entry'); }
    const Flag = redFlags.find(i => i.redFlagId === parseInt(req.params.redFlagId));

    if (!Flag) { return responseMessage.errorMessage(res, 404, 'red flag not found') }

    else if (Flag.status !== 'draft') { return responseMessage.errorMessage(res, 400, 'you are not allowed to change the location') }

    else if (Flag.createdBy !== req.user.email) {
      return responseMessage.errorMessage(res, 400, 'this record does not belong to you')
    }
    else{
      Flag.location = req.body.location;
      return responseMessage.successWithData(res, 200, "updated red-flag record's location", 
      { redFlagId: Flag.redFlagId , title: Flag.title, type: Flag.type, comment: Flag.comment, 
        createdBy: req.user.email, location: Flag.location, status: Flag.status})
    }
 }

//  update comment //
  static updateComment(req, res) {
    const { error } = validateComment.validation(req.body);
    if (error) { return responseMessage.errorMessage(res, 400, 'you are not allowed to update check your entry'); }
    const Flag = redFlags.find(i => i.redFlagId === parseInt(req.params.redFlagId));

    if (!Flag) { return responseMessage.errorMessage(res, 404, 'red flag not found') }

    else if (Flag.createdBy !== req.user.email) {
      return responseMessage.errorMessage(res, 400, 'this record does not belong to you')
    }
    else {
      Flag.comment = req.body.comment;
      return responseMessage.successWithData(res, 200, "updated red-flag record's comment", { redFlagId: Flag.redFlagId,title: Flag.title, type: Flag.type, comment: Flag.comment, 
        createdBy: req.user.email, location: Flag.location, status: Flag.status})
    }
  }

  // Delete One //
  
static deleteRedflag(req, res) {
    const deleteOne = redFlags.find(d => d.redFlagId === parseInt(req.params.redFlagId));
    if (!deleteOne) { return responseMessage.errorMessage(res, 404, 'red flag with that ID is not found') }
    else if (deleteOne.createdBy !== req.user.email) {
      return responseMessage.errorMessage(res, 400, 'this record does not belong to you')}
    else if (deleteOne) {
      const index = redFlags.indexOf(deleteOne);
      redFlags.splice(index, 1);
      return responseMessage.successWithNoData(res, 200, 'red-flag record has been deleted')
    }
  }
  }
  
export default RedFlags;