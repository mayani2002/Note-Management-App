import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './database/connection.js';
import {userRoutes} from './router/userRouter.js';
import {noteRoutes} from './router/noteRouter.js';

dotenv.config();
const app = express();
app.use(cors());


// app.use('/', (req, res) => {
//     res.json({
//         message: "Backend is running",
//     });
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/note', noteRoutes);

try {
    await sequelize.sync();
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
    console.log('Server listening on port 3001');
});
