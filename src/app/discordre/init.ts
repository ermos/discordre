import log from '@core/log';
import path from 'path';
import * as fs from 'fs';
import { error } from '@core/error';
import { Props } from '@core/props';
import Bot from '@app/bot';
import { ConfigInterface } from '@type/pipeline/config';
import Pipeline from '@app/pipeline';

export class Discordre {
  // private dashboard?: Dashboard;
  // private api?: API;
  private bot?: Bot;
  public config?: ConfigInterface;

  constructor(params: DiscordreInit) {
    log.title('# Pipelines');
    this.runPipeline();

    if (!this.config) {
      error.fatal('configuration not initialized');
      return;
    }

    log.title(`# ${this.config.name} modules`);
    const modules = Discordre.getModules();

    log.title('# Discord.js');
    this.runDiscordJS(modules);

    const apiEnabled = this.config.api?.enable !== undefined ? this.config.api?.enable : false;
    const dashboardEnabled =
      this.config.api?.dashboard?.enable !== undefined ? this.config.api?.dashboard?.enable : false;

    if (!apiEnabled) {
      return;
    }

    // const port = process.env.PORT !== undefined ? parseInt(process.env.PORT) : undefined;
    // const router = new Router(port || 80);
    //
    // log.title("# API")
    // this.api = new API(router);
    //
    // if(dashboardEnabled) {
    //     log.title("# Web Interface")
    //     this.dashboard = new Dashboard(router);
    // }
    //
    // router.listen(router.port, () => {
    //     log.info(`[web] Start web server at http://localhost:${router.port}`)
    // })
  }

  // Load pipeline process and call all childs
  private runPipeline(): void {
    const pipeline = Pipeline();
    this.config = pipeline.config;
  }

  private runDiscordJS(modules: Array<string>): void {
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
  private static getModules(): Array<string> {
    const p = path.join(process.cwd(), 'src', 'modules');
    const dir = fs.readdirSync(p);

    let modules = [];
    for (let i = 0; i < dir.length; i++) {
      log.info(`${dir[i].toUpperCase()} module found !`);
      modules.push(path.join(p, dir[i]));
    }

    return modules;
  }
}
