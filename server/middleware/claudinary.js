import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'delice',
  api_key: '239877626468716',
  api_secret: '***************************'

});
export const imageUploader = (req, res, next) => {
    cloudinary.v1.uploader.upload(req.body.images, (error, result) => {
      if (result) {
        req.body.images = result.secure_url;
      }
      if (error) {
        return res.status(404).send({
          status: 404,
          message: 'Invalid URl of the photo'
        });
      }
      return next();
    });
  };
