import { Props } from '@core/props';

export abstract class Module {
  protected props: Props

  protected constructor(props: Props) {
    this.props = props
  }
}
