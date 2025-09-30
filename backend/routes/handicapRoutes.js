import { Router } from 'express';
import { lookupHandicap } from '../controllers/handicapController.js';

const router = Router();

router.get('/', lookupHandicap);

export default router;


