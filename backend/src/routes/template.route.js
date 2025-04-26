import express from 'express';
import upload from '../config/multer.js';
import { getTemplates, updateTemplate, uploadTemplate } from '../controllers/template.controller.js';

const router = express.Router();

router.post('/upload', upload.single('psd'), uploadTemplate);
router.get('/', getTemplates);
router.put('/:id', upload.single('psd'), updateTemplate);
export default router;
