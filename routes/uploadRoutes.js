const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const uploadController = require('../controllers/uploadController');

router.post('/upload', upload.single('file'), uploadController.uploadCSV);
router.get('/template', uploadController.getCSVTemplate);
router.get('/jobs/:id/status', uploadController.getJobStatus);
router.delete('/jobs/:id', uploadController.deleteJobStatus);

module.exports = router;
