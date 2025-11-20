declare const _default: () => {
    app: {
        name: string;
        env: string;
        port: number;
    };
    logging: {
        level: string;
        folder: string;
        rotation: {
            maxFiles: string;
            maxSize: string;
        };
    };
    forwarding: {
        target: string;
    };
    apis: {
        test: {
            path: string;
            workflow: ({
                name: string;
                options: {
                    schema: {
                        type: string;
                        properties: {
                            name: {
                                type: string;
                            };
                        };
                        required: string[];
                    };
                    field?: undefined;
                    allowed?: undefined;
                    header?: undefined;
                    validTokens?: undefined;
                    secret?: undefined;
                    cookieName?: undefined;
                };
            } | {
                name: string;
                options: {
                    field: string;
                    allowed: string[];
                    schema?: undefined;
                    header?: undefined;
                    validTokens?: undefined;
                    secret?: undefined;
                    cookieName?: undefined;
                };
            } | {
                name: string;
                options: {
                    header: string;
                    validTokens: string[];
                    schema?: undefined;
                    field?: undefined;
                    allowed?: undefined;
                    secret?: undefined;
                    cookieName?: undefined;
                };
            } | {
                name: string;
                options: {
                    header: string;
                    secret: string;
                    schema?: undefined;
                    field?: undefined;
                    allowed?: undefined;
                    validTokens?: undefined;
                    cookieName?: undefined;
                };
            } | {
                name: string;
                options: {
                    cookieName: string;
                    schema?: undefined;
                    field?: undefined;
                    allowed?: undefined;
                    header?: undefined;
                    validTokens?: undefined;
                    secret?: undefined;
                };
            })[];
        };
        test2: {
            path: string;
            workflow: {
                name: string;
                options: {
                    schema: {
                        type: string;
                        properties: {
                            q: {
                                type: string;
                            };
                        };
                        required: string[];
                    };
                };
            }[];
        };
        userCreate: {
            path: string;
            workflow: {
                name: string;
                options: {
                    schema: {
                        type: string;
                        required: string[];
                        properties: {
                            name: {
                                type: string;
                            };
                            roles: {
                                type: string;
                            };
                            groups: {
                                type: string;
                            };
                        };
                    };
                };
            }[];
        };
        hello: {
            workflow: {
                name: string;
                options: {
                    schema: {
                        type: string;
                        required: string[];
                        properties: {
                            name: {
                                type: string;
                            };
                        };
                    };
                };
            }[];
        };
    };
};
export default _default;
