import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'rental-application-service', version: '1.0.0', description: 'Rental application processing' }; }
}
