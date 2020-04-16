import path from 'path';
import express from 'express';
import publicRoutes from './routes/public/publicRoutes';

const app = express();

// Middlewares

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', publicRoutes);

console.log('teste');

app.listen(3000, () => (console.log('Running in PORT 3000')));
