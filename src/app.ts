import express from 'express';
import userRoutes from './routes/users.route';
import { AppDataSource } from './config/data-source';
const app = express();
app.use (express.json());
const PORT :number = 5000;


app.use(express.urlencoded({extended: true}));

app.use('/users', userRoutes);


AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!"); 
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});