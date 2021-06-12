import express, { Express } from 'express';

export default class Router {
  public app: Express;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
  }

  public listen(port: number, callback?: () => void) {
    this.app.listen(port, callback);
  }
}
