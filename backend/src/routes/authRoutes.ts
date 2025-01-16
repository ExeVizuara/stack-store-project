import { Router } from 'express';
import { profile, signin, signout, signup } from '../controllers/auth.controller';
import { asyncHandler } from '../middleware/asyncHandler';
import { createUser, loginUser } from '../controllers/userController';
import { validateFieldsInSignup, validateFieldsInSignin } from "../middleware/validateFields";

const router : Router = Router();

router.get('/', (req, res) => {
    res.send('Inicio');
})
router.post('/signup', validateFieldsInSignup, asyncHandler(createUser));
router.post('/signin', validateFieldsInSignin, asyncHandler(loginUser));
router.post('/signout', asyncHandler(signout));
router.get('/profile', profile);

export default router;