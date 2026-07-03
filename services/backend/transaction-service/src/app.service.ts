import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'transaction-service', version: '1.0.0', description: 'Real estate transaction tracking' }; }
}
