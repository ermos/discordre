import Discord, { Client } from 'discord.js';
import { Props } from '@core/props';
import log from '@core/log';
import { DiscordEvent } from '@app/data/event';
import { error } from '@core/error';
import {CustomDiscordEvent} from "@app/data/custom";

class Bot {
  public client: Client;

  constructor(modules: string[], props: Props) {
    log.title('# Discord.js')
    log.info('BOT initialization')

    let config = {}
    if(props.config.discordjs !== undefined && props.config.discordjs.config !== undefined) {
      config = props.config.discordjs.config
    }

    this.client = new Discord.Client(config)

    this.client.on('ready', () => {
      props.client = this.client

      if(this.client.user !== null) {
        log.info(`[bot] Logged in as ${this.client.user.tag}!`)
      }

      modules.forEach((module) => {
        const {default: modIndex} = require(module)
        const mod = new modIndex(props)

        getAllFuncs(DiscordEvent, mod).map(v => this.client.on(v, mod[v].bind(mod)))

        // let customModFuncs = getAllFuncs(CustomDiscordEvent, mod)
        // modFuncs.map(v => this.client.on(v, mod[v].bind(mod)))
      })
    })

    this.client.login(process.env.DISCORD_TOKEN).catch((err) => error.fatal(`[bot] ${err.message}`))
  }
}

function getAllFuncs(eventList: string[], mod: any) {
  let props: any[] = []
  let obj = mod

  do {
    props = props.concat(Object.getOwnPropertyNames(obj))
  } while ((obj = Object.getPrototypeOf(obj)))

  return props.sort().filter(function (e, i, arr) {
    if (!eventList.find(event => event === e)) {
      return false
    }
    if (e != arr[i + 1] && typeof mod[e] == 'function') {
      return true
    }
  })
}

export default Bot;
