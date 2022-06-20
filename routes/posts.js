import express from 'express';
import auth from '../middleware/auth.js'
import * as posts from '../controllers/posts.js';

const router = express.Router();

router.get('/', auth, posts.getPosts);
router.get('/:id', auth, posts.getPost);
router.patch('/:id', auth, posts.patchPost);
router.put('/:id', auth, posts.updatePost);
router.delete('/:id', auth, posts.deletePost);
router.post('/', auth, posts.createPost);

export default router;
