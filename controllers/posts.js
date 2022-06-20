import {Validator} from 'jsonschema';
import {posts} from '../data/index.js';

const jsonValidator = new Validator();

const postSchema = {
    type: 'object',
    properties: {
        author: {type: 'string'},
        title: {type: 'string'},
        body: {type: 'string'}
    },
    required: ['author', 'title', 'body']
};

const sortPostKeys = (obj) => {
    const newObject = {};
    const order = ['id', 'author', 'title', 'body', 'timestamp'];
    for (let i = 0; i < order.length; i++) {
        if (Object.hasOwnProperty.call(obj, order[i])) {
            newObject[order[i]] = obj[order[i]];
        }
    }
    return newObject;
}

export const findPost = (id, res) => {
    if (!id) {
        res.status(500).json({error: 'Please provide post "id"'});
        return null;
    }
    const currentPost = posts.find((post) => post.id === Number(id));
    if (!currentPost) {
        res.status(500).json({error: `Could not find post matching id: ${id}`});
        return null;
    }
    return currentPost;
}

export const getPosts = (req, res) => {
    return res.json({posts});
};

export const getPost = (req, res) => {
    const currentPost = findPost(req.params.id, res);
    if (!currentPost) {
        return;
    }
    return res.json({currentPost});
};

export const updatePost = (req, res) => {
    const currentPost = findPost(req.params.id, res);
    if (!currentPost) {
        return;
    }

    const postToUpdate = req.body;
    const currentId = {id: Number(req.params.id)};
    const updatedPost = {...currentId, ...postToUpdate};
    Object.assign(currentPost, updatedPost);

    return res.json(updatedPost);
};

export const patchPost = (req, res) => {
    const currentPost = findPost(req.params.id, res);
    if (!currentPost) {
        return;
    }

    const postToPath = req.body;
    const updatedPost = {...currentPost, ...postToPath};
    Object.assign(currentPost, updatedPost);

    return res.json(updatedPost);
};

export const deletePost = (req, res) => {
    const currentPost = findPost(req.params.id, res);
    if (!currentPost) {
        return;
    }

    posts.splice(posts.findIndex(post => post.id === Number(req.params.id)), 1)

    return res.json(posts);
};

export const createPost = (req, res) => {
    try {
        jsonValidator.validate(req.body, postSchema, {throwError: true});
    } catch (error) {
        return res.status(500).json({error: `Invalid request format: ${error.stack}`});
    }

    const newPost = req.body;
    const currentPost = posts.find((post) => post.title === newPost.title);
    if (currentPost) {
        return res.status(500).json({error: `Title "${newPost.title}" already exists!`});
    }

    // get largest id, add 1
    const id = Math.max(...posts.map(post => post.id))
    newPost.id = id + 1;
    newPost.timestamp = new Date().toISOString().split('.')[0].replace('T', ' ');

    // sort keys
    const postToAdd = sortPostKeys(newPost);

    posts.push(postToAdd);
    return res.json({posts});
};
