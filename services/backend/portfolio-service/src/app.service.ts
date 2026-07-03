import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'portfolio-service', version: '1.0.0', description: 'Investment portfolio tracking' }; }
}
