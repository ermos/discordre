export interface ConfigInterface {
  name: string
  description: string
  api?: ConfigAPI
  [x: string]: any
}

export interface ConfigAPI {
  enable: boolean
  prefix?: string
}