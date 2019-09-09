// Type definitions for react-native-simple-markdown 1.1.0
// Project: https://github.com/CharlesMangwa/react-native-simple-markdown
// Definitions by: Mohamed Shaban <https://github.com/drmas>

import { Component, ReactNode } from 'react';
import { ViewStyle, TextStyle, ImageStyle, StyleProp } from 'react-native';
import styles from './styles';

export interface ReactNativeSimpleMarkdown { }
export type ValidRules =
  | 'autolink'
  | 'blockQuote'
  | 'br'
  | 'codeBlock'
  | 'del'
  | 'em'
  | 'heading'
  | 'hr'
  | 'image'
  | 'inlineCode'
  | 'link'
  | 'list'
  | 'newline'
  | 'paragraph'
  | 'strong'
  | 'table'
  | 'url';

interface State {
  key: string;
  withinText: boolean;
}

export interface Node {
  content: any;
  target: string;
  level: number;
  items: any[];
  ordered: boolean;
}

type Output = (content: any, state: State) => string;

export interface Rule {
  match?: any;
  react?: (node: Node, output: Output, state: State) => ReactNode;
}

export type Rules = Partial<{ [key in ValidRules]: Rule }>;

export interface Props {
  styles: { [key in keyof typeof styles]: StyleProp<ViewStyle> | StyleProp<TextStyle> | StyleProp<ImageStyle> };
  children?: string | string[];
  rules?: Rules;
  whitelist?: string[];
  blacklist?: string[];
}

export default class RNSMDComponent extends Component<Props> {}