import express from 'express';
import auth from '../middleware/auth';
import Redflags from '../controllers/redFlagController';

const redFlag_router = express.Router();

redFlag_router.post('/api/v2/red-flags', auth, Redflags.postRedFlag);
redFlag_router.get('/api/v2/red-flags', auth, Redflags.getAll);
redFlag_router.get('/api/v2/red-flags/:id', auth, Redflags.getOne);
redFlag_router.patch('/api/v2/red-flags/:id/location', auth, Redflags.updateLocation);
redFlag_router.patch('/api/v2/red-flags/:id/comment', auth, Redflags.updateComment);
redFlag_router.patch('/api/v2/red-flags/:id/status', auth, Redflags.changeStatus);
redFlag_router.delete('/api/v2/red-flags/:id', auth, Redflags.deleteRedflag);



export default redFlag_router;