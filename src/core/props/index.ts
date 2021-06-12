import { Client } from 'discord.js';
import { ConfigInterface } from '@type/pipeline/config';

export class Props {
  public config?: ConfigInterface;
  public client?: Client;

  constructor(config: ConfigInterface) {
    this.config = config;
  }
}
