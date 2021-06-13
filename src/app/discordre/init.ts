import log from '@core/log';
import path from 'path';
import * as fs from 'fs';
import { error } from '@core/error';
import { Props } from '@core/props';
import Bot from '@app/bot';
import { ConfigInterface } from '@type/pipeline/config';
import Pipeline from '@app/pipeline';
import Router from "@core/router";

export class Discordre {
  // private api?: API;
  private bot?: Bot;
  public config?: ConfigInterface;

  constructor(params: DiscordreInit) {
    log.title('# Pipelines')
    this.runPipeline()

    if (!this.config) {
      error.fatal('configuration not initialized')
      return
    }

    log.title(`# ${this.config.name} modules`)
    const modules = Discordre.getModules()

    log.title('# Discord.js')
    this.runDiscordJS(modules)

    const apiEnabled = this.config.api?.enable !== undefined ? this.config.api?.enable : false

    if (!apiEnabled) {
      return
    }

    const port = process.env.PORT !== undefined ? parseInt(process.env.PORT, undefined) : undefined;
    const router = new Router(port || 80);

    log.title("# API")
    // this.api = new API(router);
    
    router.listen(router.port, () => {
        log.info(`[http] Start server at http://localhost:${router.port}`)
    })
  }

  // Load pipeline process and call all childs
  private runPipeline(): void {
    const pipeline = Pipeline();
    this.config = pipeline.config;
  }

  private runDiscordJS(modules: string[]): void {
    if (!process.env.DISCORD_TOKEN) {
      error.fatal('cannot find DISCORD_TOKEN in environment variable');
    }

    if (!this.config) {
      error.fatal('configuration not initialized');
      return;
    }

    this.bot = new Bot(modules, new Props(this.config));
  }

  // Load all app modules
  private static getModules(): string[] {
    const modules = [];
    const p = path.join(process.cwd(), 'src', 'modules');
    const dir = fs.readdirSync(p);

    for (const module of dir) {
      const modulePath = path.join(p, module)

      if(fs.lstatSync(modulePath).isDirectory()) {
        log.info(`${module.toUpperCase()} module found !`);
        modules.push(modulePath);
      }
    }

    return modules;
  }
}
