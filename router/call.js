import express from 'express';
import { createCall, ListCall , CallById} from '../controller/call.js';

const router = express.Router()

router.post("/call", createCall)
router.get("/call", ListCall)
router.get("/call/:id", CallById) 

export default router