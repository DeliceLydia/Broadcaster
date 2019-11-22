import express from 'express';
import user_router from './routes/userRoutes';
import redFlag_router from './routes/redFlagRoutes';

const app = express();
app.use(express.json());

app.use('/', user_router);
app.use('/', redFlag_router);
app.get('/', (req, res) => {
    res.send({
      status: 200,
      message: 'Welcome to the Broadcaster application',
    });
});
export default app;