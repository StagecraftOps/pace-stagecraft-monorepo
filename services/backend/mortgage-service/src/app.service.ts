import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'mortgage-service', version: '1.0.0', description: 'Mortgage calculator and rates' }; }
}
