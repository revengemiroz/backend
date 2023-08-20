import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: (config: ConfigService) => {
    return v2.config({
      cloud_name: 'dsptga4nz',
      api_key: '637952337271848',
      api_secret: 'G7cPa_Orp8viKvhzUzlf0DxABTE',
    });
  },
};
