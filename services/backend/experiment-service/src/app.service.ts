import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'experiment-service', version: '1.0.0', description: 'Experimentation platform' }; }
}
