import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'notification-service', version: '1.0.0', description: 'Core notification orchestration' }; }
}
