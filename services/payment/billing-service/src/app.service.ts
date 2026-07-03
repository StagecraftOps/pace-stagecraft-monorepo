import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'billing-service', version: '1.0.0', description: 'Subscription billing management' }; }
}
