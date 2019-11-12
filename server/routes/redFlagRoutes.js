import express from 'express';
import auth from '../middleware/auth';
// import {imageUploader} from '../middleware/claudinary';
import Redflags from '../controllers/redFlagController';

const redFlag_router = express.Router();

redFlag_router.post('/api/v1/red-flags', auth, Redflags.postRedFlag);
redFlag_router.get('/api/v1/red-flags', auth, Redflags.getAll);
redFlag_router.get('/api/v1/red-flags/:redFlagId', auth, Redflags.getOne);


export default redFlag_router;