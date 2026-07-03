import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'property-mgmt-service', version: '1.0.0', description: 'Property management platform' }; }
}
