import * as fs from 'fs';
import * as path from 'path';
import log from '@core/log';
import { error } from '@core/error';
import { ConfigInterface } from '@type/pipeline/config';

export default function Config(): ConfigInterface {
  log.info('[config] looking for discordre.json from ' + path.join(process.cwd(), 'discordre.json'));

  const data = fs.readFileSync(path.join(process.cwd(), 'discordre.json'), 'utf8');
  if (!data) {
    error.fatal('[config] discordre.json is require');
  }

  log.info('[config] import configuration successfully !');

  return JSON.parse(data.toString());
}
