import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'premier-agent-service', version: '1.0.0', description: 'Premier Agent program management' }; }
}
