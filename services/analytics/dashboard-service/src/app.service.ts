import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'dashboard-service', version: '1.0.0', description: 'Analytics dashboard backend' }; }
}
