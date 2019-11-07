import express from 'express';
import user_router from './routes/userRoutes';

const app = express();
app.use(express.json());

app.use('/', user_router);
app.get('/', (req, res) => {
    res.send({
      status: 200,
      message: 'Welcome to the Broadcast application',
    });
});
export default app;