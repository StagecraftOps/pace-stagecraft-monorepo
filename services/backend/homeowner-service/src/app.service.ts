import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'homeowner-service', version: '1.0.0', description: 'Homeowner dashboard backend' }; }
}
