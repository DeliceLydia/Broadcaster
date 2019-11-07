import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send({
      status: 200,
      message: 'Welcome to the Broadcast application',
    });
});
export default app;