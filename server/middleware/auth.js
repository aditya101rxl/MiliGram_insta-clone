import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../private.js'

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedData = jwt.verify(token, SECRET_KEY)
        req.userId = decodedData.id;// decodedData?.id won't run
        next()
    } catch (error) {
        console.log(error);
    }
}
