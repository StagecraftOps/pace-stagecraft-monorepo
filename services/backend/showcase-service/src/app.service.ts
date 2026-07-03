import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'showcase-service', version: '1.0.0', description: 'Zillow Showcase management' }; }
}
