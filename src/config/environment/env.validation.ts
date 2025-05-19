import * as Joi from 'joi';

export const EnvValidationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  HOST: Joi.string().required(),
  PORT: Joi.number().required(),
  DEBUG: Joi.boolean(),

  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_SYNCHRONIZE: Joi.boolean().required(),
  DB_LOGGING: Joi.required(),
  DB_TYPE: Joi.string().required(),

  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_REGION: Joi.string().required(),

  AWS_SQS_WAIT_TIME_SECONDS: Joi.number().required(),
  AWS_SQS_MAX_NUMBER_OF_MESSAGES: Joi.number().required(),
});
