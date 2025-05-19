import * as dotenv from 'dotenv';

import { DatabaseConfigService } from './database-config.service';
import { EnvConfiguration } from '../environment/env.config';

dotenv.config();

const buildDataSource = async () => {
  return DatabaseConfigService.getDataSource(EnvConfiguration());
};

export const AppDs = buildDataSource();
