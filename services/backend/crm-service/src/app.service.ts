import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'crm-service', version: '1.0.0', description: 'CRM integration layer' }; }
}
