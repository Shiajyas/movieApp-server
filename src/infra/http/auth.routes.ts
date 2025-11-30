import { Router } from 'express';
import * as AuthCtrl from '../../controllers/AuthController';
const router = Router();

router.post('/register', AuthCtrl.register);
router.post('/login', AuthCtrl.login);
router.post('/refresh', AuthCtrl.refresh);
router.post('/logout', AuthCtrl.logout);

export default router;
