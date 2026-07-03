import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'cms-api', version: '1.0.0', description: 'Headless CMS API' }; }
}
