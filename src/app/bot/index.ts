import Discord, { Client } from 'discord.js';
import { Props } from '@core/props';
import log from '@core/log';
import { DiscordEvent } from '@app/data/event';
import { error } from '@core/error';
import { Module } from '@app/discordre/module';

class Bot {
  public client: Client;

  constructor(modules: string[], props: Props) {
    log.info('BOT initialization');
    this.client = new Discord.Client();

    this.client.on('ready', () => {
      props.client = this.client;

      if (this.client.user !== null) {
        log.info(`[bot] Logged in as ${this.client.user.tag}!`);
      }

      modules.forEach((module) => {
        let {default: modIndex} = require(module)
        let mod = new modIndex(props)
        let modFuncs = getAllFuncs(mod)
        modFuncs.map(v => this.client.on(v, mod[v].bind(mod)))
      });
    });

    this.client.login(process.env.DISCORD_TOKEN).catch((err) => error.fatal(`[bot] ${err.message}`));
  }
}

function getAllFuncs(toCheck: { [x: string]: any }) {
  let props: any[] = [];
  let obj = toCheck;
  do {
    props = props.concat(Object.getOwnPropertyNames(obj));
  } while ((obj = Object.getPrototypeOf(obj)));

  return props.sort().filter(function (e, i, arr) {
    if (!DiscordEvent.find((event) => event === e)) return false;
    if (e != arr[i + 1] && typeof toCheck[e] == 'function') return true;
  });
}

export default Bot;
