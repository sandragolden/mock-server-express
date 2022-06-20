import jwt from 'jsonwebtoken';
import {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} from '../constants/index.js';
import {users} from '../data/index.js';

let refreshTokens = [];

export const auth = (req, res) => {
    if (req.headers.authorization === undefined){
        return res.status(401).send('Please provide WWW-Authorization using basic in headers with base 64 encoding');
    }

    const encoded = req.headers.authorization.split(' ')[1];
    const decoded = new Buffer(encoded,'base64').toString();
    const username = decoded.split(':')[0];
    const password = decoded.split(':')[1];

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        // generate an access token
        const accessToken = jwt.sign({ username: user.username, role: user.role }, ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
        const refreshToken = jwt.sign({ username: user.username, role: user.role }, REFRESH_TOKEN_SECRET);

        refreshTokens.push(refreshToken);

        return res.json({
            accessToken,
            refreshToken
        });
    }

    return res.status(401).send('Username or password incorrect');
};

export const refreshToken = (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ username: user.username, role: user.role }, ACCESS_TOKEN_SECRET, { expiresIn: '20m' });

        res.json({
            accessToken
        });
    });
};

export const logout = (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);
    res.send('Logout successful');
};
