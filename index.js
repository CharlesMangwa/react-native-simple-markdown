/* @flow */

import React, { Component } from 'react'
import { View } from 'react-native'
import SimpleMarkdown from 'simple-markdown'
import _ from 'lodash'
import initialRules from './rules'
import initialStyles from './styles'

type Props = {
  styles: StyleSheet,
  children?: string,
  rules: Object,
  whitelist: Array,
  blacklist: Array
}

type DefaultProps = Props & {
  children: string
}

class Markdown extends Component<DefaultProps, Props, void> {
  static defaultProps = {
    styles: initialStyles,
    children: '',
    rules: {},
    whitelist: [],
    blacklist: []
  }

  /** Post processes rules to strip out unwanted styling options
    * while keeping the default 'paragraph' and 'text' rules
    */
  _postProcessRules = (preRules: Array<string>): Array<string> => {
    const defaultRules = ['paragraph', 'text']
    if (this.props.whitelist.length) {
      return _.pick(preRules, _.concat(this.props.whitelist, defaultRules))
    } else if (this.props.blacklist.length) {
      return _.omit(preRules, _.pullAll(this.props.blacklist, defaultRules))
    } else {
      return preRules
    }
  }

  _renderContent = (children: string): React$Element<any> => {
    try {
      const mergedStyles = Object.assign({}, initialStyles, this.props.styles)
      const rules = this._postProcessRules(
        _.merge(
          {},
          SimpleMarkdown.defaultRules,
          initialRules(mergedStyles),
          this.props.rules
        )
      )
      const child = Array.isArray(this.props.children)
        ? this.props.children.join('')
        : this.props.children
      const blockSource = child + '\n\n'
      const tree = SimpleMarkdown.parserFor(rules)(blockSource, {
        inline: false
      })
      return SimpleMarkdown.reactFor(SimpleMarkdown.ruleOutput(rules, 'react'))(
        tree
      )
    } catch (errors) {
      this.props.errorHandler
        ? this.props.errorHandler(errors, children)
        : console.error(errors)
    }
  }

  shouldComponentUpdate = (nextProps: Props): boolean =>
    this.props.children !== nextProps.children ||
    this.props.styles !== nextProps.styles

  render() {
    return (
      <View style={[initialStyles.view, this.props.styles.view]}>
        {this._renderContent(this.props.children)}
      </View>
    )
  }
}

export default Markdown
