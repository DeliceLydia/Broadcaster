import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(400).send({
            status: 400,
            message: 'Access denied. no token provided'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (ex) {
        return res.status(401).send({
            status: 401,
            message: 'Invalid token'
        });
    }
};
export default auth;