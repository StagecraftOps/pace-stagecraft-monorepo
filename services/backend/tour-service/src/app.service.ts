import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'tour-service', version: '1.0.0', description: '3D tour management' }; }
}
