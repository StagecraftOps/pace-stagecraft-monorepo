import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'user-service', version: '1.0.0', description: 'User profiles and preferences' }; }
}
