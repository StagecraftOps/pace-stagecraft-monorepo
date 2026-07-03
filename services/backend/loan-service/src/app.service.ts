import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'loan-service', version: '1.0.0', description: 'Loan application management' }; }
}
