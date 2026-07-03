import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'subscription-service', version: '1.0.0', description: 'Subscription management' }; }
}
