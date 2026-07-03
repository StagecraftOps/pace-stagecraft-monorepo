import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'lead-service', version: '1.0.0', description: 'Lead generation and tracking' }; }
}
