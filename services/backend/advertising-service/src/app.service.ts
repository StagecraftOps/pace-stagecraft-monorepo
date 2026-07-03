import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'advertising-service', version: '1.0.0', description: 'Ad inventory and targeting' }; }
}
