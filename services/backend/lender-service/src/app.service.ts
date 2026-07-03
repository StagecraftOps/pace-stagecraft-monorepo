import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'lender-service', version: '1.0.0', description: 'Lender directory and rates' }; }
}
