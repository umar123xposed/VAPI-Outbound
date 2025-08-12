import express from 'express';
import { createAgent, updateAgent, getAgentById, ListAgent} from '../controller/agent.js';  
const router = express.Router()

router.post('/agent', createAgent);
router.put('/agent/:id', updateAgent);
router.get('/agent/:id', getAgentById);
router.get('/agent', ListAgent);

export default router;
