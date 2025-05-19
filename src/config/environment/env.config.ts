const env = process.env;
export const APP = 'app';
export const DB_CONFIG = 'db';
export const AWS = 'aws';
export const SQS = 'sqs';

interface IEnvConfiguration {
  [APP]: {
    env: string;
    host: string;
    port: number;
    debug: boolean;
  };
  [DB_CONFIG]: {
    database: string;
    host: string;
    port: number;
    username: string;
    password: string;
    synchronize: boolean;
    logging: string[];
    type: string;
  };
  [AWS]: {
    [SQS]: {
      maxNumberOfMessages: number;
      waitTimeSeconds: number;
    };
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
  };
}

export const EnvConfiguration = (): IEnvConfiguration => ({
  [APP]: {
    env: env.NODE_ENV,
    host: env.HOST,
    port: parseInt(env.PORT),
    debug: env.DEBUG === 'true',
  },

  [DB_CONFIG]: {
    database: env.DB_NAME,
    host: env.DB_HOST,
    port: +env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    synchronize: env.DB_SYNCHRONIZE === 'true',
    logging: [...env.DB_LOGGING],
    type: env.DB_TYPE,
  },
  [AWS]: {
    [SQS]: {
      maxNumberOfMessages: parseInt(env.AWS_SQS_MAX_NUMBER_OF_MESSAGES),
      waitTimeSeconds: parseInt(env.AWS_SQS_WAIT_TIME_SECONDS),
    },
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    region: env.AWS_REGION,
  },
});
