import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'lease-service', version: '1.0.0', description: 'Lease document management' }; }
}
