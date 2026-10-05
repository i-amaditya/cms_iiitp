import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.ts';
import { uploadFacultyPhoto } from '../middleware/upload.ts';

const router = Router();

// Upload photo endpoint requires authentication (faculty or admin)
router.post('/photo', authenticateToken, (req, res) => {
  uploadFacultyPhoto.single('photo')(req, res, (err) => {
    if (err) {
      res.status(400).json({ error: err.message || 'File upload failed' });
      return;
    }

    if (!req.file) {
      res.status(400).json({ error: 'No image file uploaded' });
      return;
    }

    // Relative web URL
    const fileUrl = `/uploads/faculty/${req.file.filename}`;
    res.json({
      url: fileUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
  });
});

export default router;
