import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'e-sign-service', version: '1.0.0', description: 'Electronic signature integration' }; }
}
