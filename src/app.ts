import express from 'express';
import userRoutes from './routes/users.route';
const app = express();
app.use (express.json());
const PORT :number = 5000;


app.use(express.urlencoded({extended: true}));

app.use('/users', userRoutes);




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});