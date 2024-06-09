import Express from "express";
import { signup, login } from "../controller/user-controller.js";

const route = Express.Router();

route.post('/signup', signup);
route.post('/login', login);
// route.put('/update/:id', updateAccount);
// route.get('/delete/:gid', deleteAccount);

export { route as userRoutes }