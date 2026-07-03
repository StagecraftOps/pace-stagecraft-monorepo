import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'offer-service', version: '1.0.0', description: 'Offer submission and tracking' }; }
}
