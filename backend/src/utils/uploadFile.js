// utils/uploadFile.js
import { PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import s3 from '../config/s3.js';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();
const uploadFileToS3 = async (file, folder = 'templates') => {
  try {
    const fileContent = fs.readFileSync(file.path);
    const extension = path.extname(file.originalname);
    const fileName = `${uuidv4()}${extension}`;
    const key = `${folder}/${fileName}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: fileContent,
      ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));

    // Clean up local file after upload
    fs.unlinkSync(file.path);

    // Return the file URL
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  } catch (error) {
    // Log the error
    console.error("Error uploading file to S3:", error);

    // Ensure the local file is deleted even if upload fails
    try {
      fs.unlinkSync(file.path);
      console.log("Local file deleted after error.");
    } catch (unlinkError) {
      console.error("Error deleting local file:", unlinkError);
    }

    // Re-throw the error to be handled by the calling function
    throw error;
  }
};

export default uploadFileToS3;