import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: 'graphql-gateway', version: '1.0.0', description: 'Apollo GraphQL federation gateway' }; }
}
