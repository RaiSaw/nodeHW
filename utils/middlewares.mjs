import { users } from "./constants.mjs";
import { models } from "./constants.mjs";


// Middlewares
/* const loggingMw = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
}
 */
export const handleIndexId = (req, res, next) => {
    const {
        params: {id}
    } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);
    const findModIndex = models.findIndex((mod) => mod.id === parsedId);
    if (findModIndex === -1) return res.sendStatus(404);
    req.findModIndex = findModIndex;
    next();
}