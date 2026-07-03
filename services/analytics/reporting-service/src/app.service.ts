import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'reporting-service', version: '1.0.0', description: 'Business reporting engine' }; }
}
