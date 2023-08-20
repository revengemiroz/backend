import { Injectable } from '@nestjs/common';
// import * as cloudinary from 'cloudinary';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  // constructor() {
  //   v2.config({
  //     cloud_name: 'dsptga4nz',
  //     api_key: '637952337271848',
  //     api_secret: 'G7cPa_Orp8viKvhzUzlf0DxABTE',
  //   });
  // }
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      toStream(file.buffer).pipe(upload);
    });
  }
}
