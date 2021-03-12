import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../private.js'

export const auth = async (req, res, next) => {
    const {user_id} = req.cookies;
    console.log(user_id);
    // try {
    //     const token = req.headers.authorization.split(" ")[1];
    //     const decodedData = jwt.verify(token, SECRET_KEY)
    //     req.userId = decodedData?.id;
    //     next()
    // } catch (error) {
    //     res.send({ message: 'your jwt has expired Login again' });
    //     console.log(error);
    // }
    next()
}