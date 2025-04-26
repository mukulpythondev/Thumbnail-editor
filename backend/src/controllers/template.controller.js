// controllers/template.controller.js
import s3 from '../config/s3.js';
import uploadFileToS3 from '../utils/uploadFile.js';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import Template from '../model/template.model.js'; // Import your Mongoose model!

// Upload a new template
export const uploadTemplate = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: 'PSD file is required.' });
    }

    // Upload to S3
    const fileUrl = await uploadFileToS3(file);

    // Save to MongoDB
    const newTemplate = await Template.create({
      title,
      psdUrl: fileUrl,
    });

    res.status(201).json({
      success: true,
      template: newTemplate,
    });
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).json({ success: false, message: 'Upload failed.' });
  }
};

// Get all templates
export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, templates });
  } catch (error) {
    console.error('Fetch failed:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch templates.' });
  }
};

// Update a template
export const updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file; // Single file now

    if (!file) {
      return res.status(400).json({ success: false, message: 'PSD file is required.' });
    }

    const template = await Template.findById(id);
    if (!template) {
      return res.status(404).json({ success: false, message: 'Template not found.' });
    }

    // Delete old PSD from S3
    const oldKey = template.psdUrl.split('/').pop(); // Extract file name
    await s3.send(new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: oldKey,
    }));

    // Upload new PSD
    const newPsdUrl = await uploadFileToS3(file);

    // Update DB
    template.psdUrl = newPsdUrl;
    await template.save();

    res.status(200).json({ success: true, template });
  } catch (error) {
    console.error('Update failed:', error);
    res.status(500).json({ success: false, message: 'Update failed.' });
  }
};
