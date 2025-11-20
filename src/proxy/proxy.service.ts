import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

export interface ForwardResponse {
  status: number;
  headers: Record<string, string>;
  data: any;
}

@Injectable()
export class ProxyService {
  constructor(private config: ConfigService) {}

  async forward(req: any): Promise<ForwardResponse> {
    const target = this.config.get<string>('forwarding.target');
    const url = new URL(req.originalUrl || req.url, target).toString();

    const headers = { ...req.headers };
    delete headers.host;

    const resp = await axios({
      method: req.method,
      url,
      headers,
      data: req.body,
      validateStatus: () => true,
    });

    return {
      status: resp.status,
      headers: Object.fromEntries(Object.entries(resp.headers)),
      data: resp.data,
    };
  }
}
