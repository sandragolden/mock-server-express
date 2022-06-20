import express from 'express';
import bodyParser from 'body-parser';
import authRouter from './routes/auth.js'
import postsRouter from './routes/posts.js'
import {PORT, SERVER_URL} from './constants/index.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/', (req, res, next) => {
    res.status(200).send(`Welcome to the <a href="${SERVER_URL}/posts">mock API</a> running on port ${PORT}.`);
    return next();
});

app.listen(PORT, () =>
    console.log(`The mock API is running on: ${SERVER_URL}/posts.`)
);
