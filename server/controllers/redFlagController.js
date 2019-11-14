import {validateRedFlag, validateLocation} from '../validations/redFlagValidation';
import responseMessage from '../helpers/response';
import moment from 'moment';
import redFlags from '../models/redFlagModel';


class RedFlags {
    static postRedFlag(req, res) {
        const { error } = validateRedFlag.validation(req.body);
    if (error) { return responseMessage.errorMessage(res, 400, error.details[0].message); }
    
    const redFlagId = redFlags.length + 1;
    const {title, type, comment, location, status} = req.body;
    const redFlag = {redFlagId, created_on : moment().format('LL'), title, type, comment, location, status,};
    redFlags.push(redFlag);
    return responseMessage.successWithData(res, 200, 'Created red flag record', {redFlagId});
   }
   
   static getAll(req, res) {
    if (!redFlags) { return responseMessage.errorMessage(res, 404, 'no red flags found'); }
    else { return responseMessage.successUser(res, 200 , redFlags); }
   }
   
   static getOne(req, res) {
    const redFlagId = redFlags.find(h => h.redFlagId === parseInt(req.params.redFlagId));
    if (!redFlagId) { return responseMessage.errorMessage(res, 404, 'red flag not found')}
    else { return responseMessage.successUser(res, 200, redFlagId); }
  }
  
  static updateLocation(req, res) {
    const { error } = validateLocation.validation(req.body);
    if (error) { return responseMessage.errorMessage(res, 400, error.details[0].message); }
    const check_redFlag = redFlags.find(i => i.redFlagId === parseInt(req.params.redFlagId));
    
    if(!check_redFlag) {return responseMessage.errorMessage(res, 404, 'red flag not found')}
    
     if(check_redFlag.status !== 'draft') 
    {return responseMessage.errorMessage(res, 400, 'you are not allowed to change the location')}
    
    if(check_redFlag) {
      check_redFlag.location = req.body.location;
      return responseMessage.successWithData(res, 200, "updated red-flag record's location ", {redFlagId : check_redFlag.redFlagId})

    } 
  }
}
export default RedFlags;
