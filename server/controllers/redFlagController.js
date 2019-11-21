import { validateRedFlag, validateLocation, validateComment } from '../validations/redFlagValidation';
import responseMessage from '../helpers/response';
import moment from 'moment';
import redFlags from '../models/redFlagModel';


class RedFlags {
  static postRedFlag(req, res) {
    const { error } = validateRedFlag.validation(req.body);
    if (error) { return responseMessage.errorMessage(res, 400, error.details[0].message); }

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
    if (error) { return responseMessage.errorMessage(res, 400, error.details[0].message); }
    const check_redFlag = redFlags.find(i => i.redFlagId === parseInt(req.params.redFlagId));

    if (!check_redFlag) { return responseMessage.errorMessage(res, 404, 'red flag not found') }

    else if (check_redFlag.status !== 'draft') { return responseMessage.errorMessage(res, 400, 'you are not allowed to change the location') }

    else if (check_redFlag.createdBy !== req.user.email) {
      return responseMessage.errorMessage(res, 400, 'this record does not belong to you')
    }
    else if (check_redFlag.createdBy === req.user.email) {
      check_redFlag.location = req.body.location;
      return responseMessage.successWithData(res, 200, "updated red-flag record's location", { redFlagId: check_redFlag.redFlagId })
    }
 }

//  update comment //
  static updateComment(req, res) {
    const { error } = validateComment.validation(req.body);
    if (error) { return responseMessage.errorMessage(res, 400, error.details[0].message); }
    const check_Flag = redFlags.find(i => i.redFlagId === parseInt(req.params.redFlagId));

    if (!check_Flag) { return responseMessage.errorMessage(res, 404, 'red flag not found') }

    else if (check_Flag.createdBy !== req.user.email) {
      return responseMessage.errorMessage(res, 400, 'this record does not belong to you')
    }
    else if (check_Flag.createdBy === req.user.email) {
      check_Flag.comment = req.body.comment;
      return responseMessage.successWithData(res, 200, "updated red-flag record's comment", { redFlagId: check_Flag.redFlagId })
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
