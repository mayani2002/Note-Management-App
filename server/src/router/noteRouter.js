import Express from 'express';
import { createNote, deleteNote, getNote, updateNote, getNotes } from '../controller/note-controller.js';

const route = Express.Router();

route.post('/add', createNote);
route.get('/get/:id', getNote);
route.get('/getall/:userId', getNotes);
route.put('/update/:id', updateNote);
route.delete('/delete/:id', deleteNote);

export { route as noteRoutes }
