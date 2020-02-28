import express from 'express';
import apiRooter from './routes';

const app = express();

app.use(express.json());

app.use('/api/bmw', apiRooter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`server is running on port ${ process.env.PORT || 3000 }`);
})