export type ProjectConfiguration = {
  DATABASE: {
    HOST: string;
    USERNAME: string;
    PASSWORD: string;
    NAME: string;
  };

  SERVER: {
    PORT: number;
  };
  SERVICE_NAME: string;
  LOG_LEVEL: string;
  SHARED_SECRETS: string;
};
