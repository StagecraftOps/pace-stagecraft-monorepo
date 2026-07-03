import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'audience-service', version: '1.0.0', description: 'Audience segmentation' }; }
}
