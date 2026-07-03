import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'identity-service', version: '1.0.0', description: 'User identity management' }; }
}
