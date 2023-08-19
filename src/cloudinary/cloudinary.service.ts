import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.v2.config({
      cloud_name: 'dsptga4nz',
      api_key: '637952337271848',
      api_secret: 'G7cPa_Orp8viKvhzUzlf0DxABTE',
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    console.log(file.path);
    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: 'testBackend', // Optional: specify a folder in your Cloudinary account
    });
    return result.secure_url;
  }
}
