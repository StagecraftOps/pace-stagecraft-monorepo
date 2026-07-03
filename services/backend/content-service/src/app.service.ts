import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'content-service', version: '1.0.0', description: 'CMS content management' }; }
}
