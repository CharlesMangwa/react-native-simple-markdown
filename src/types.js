/* @flow */

export type Props = {
  blacklist: Array<any>, // Should be Array<string> but Lodash types require Array<any>
  children: string,
  errorHandler: Function,
  rules: Object,
  styles: Object,
  whitelist: Array<any>,
}

export type DefaultProps = Props & {
  styles: Object,
}
