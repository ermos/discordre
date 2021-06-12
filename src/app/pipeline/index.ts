import Env from './pipes/env';
import Config from './pipes/config';
import { PipelineResult } from '@type/pipeline';

export default function Pipeline(): PipelineResult {
  Env();
  return {
    config: Config(),
  };
}
