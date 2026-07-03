import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'rental-service', version: '1.0.0', description: 'Rental listing management' }; }
}
