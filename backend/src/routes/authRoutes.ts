import { Router } from 'express';
import { profile, signout } from '../controllers/auth.controller';
import { asyncHandler } from '../middleware/asyncHandler';
import { createUser, loginUser } from '../controllers/userController';
import { validateFieldsInSignup, validateFieldsInSignin } from "../middleware/validateFields";
import { verifyToken } from '../middleware/verifyToken';

const router: Router = Router();

router.get('/', (req, res) => {
    res.send('Inicio');
})

router.get('/check', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Token valido', user: req.user });
});

router.post('/signup', validateFieldsInSignup, asyncHandler(createUser));
router.post('/signin', validateFieldsInSignin, asyncHandler(loginUser));
router.post('/signout', asyncHandler(signout));
router.get('/profile', profile);

export default router;