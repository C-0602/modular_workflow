import { ConfigService } from '@nestjs/config';
export interface ForwardResponse {
    status: number;
    headers: Record<string, string>;
    data: any;
}
export declare class ProxyService {
    private config;
    constructor(config: ConfigService);
    forward(req: any): Promise<ForwardResponse>;
}
