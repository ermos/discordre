import { Client } from 'discord.js';
import { ConfigInterface } from '@type/pipeline/config';
import DB from "@core/db";
import {Knex} from "knex";

export class Props {
  public config: ConfigInterface;
  public client?: Client;
  public db?: Knex;

  constructor(config: ConfigInterface, db: Knex) {
    this.config = config;
    this.db = db
  }
}
