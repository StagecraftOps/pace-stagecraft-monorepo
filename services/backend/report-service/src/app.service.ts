import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'report-service', version: '1.0.0', description: 'Listing report generation' }; }
}
