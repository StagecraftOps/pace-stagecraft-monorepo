import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'revenue-analytics', version: '1.0.0', description: 'Revenue analytics service' }; }
}
