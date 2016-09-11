/* @flow */

import React, { Component } from 'react'
import { View } from 'react-native'
import SimpleMarkdown from 'simple-markdown'
import _ from 'lodash'
import initialRules from './rules'
import styles from './styles'

type Props = {
  styles: any,
  children?: string,
}

type DefaultProps = Props & {
  children: string,
}

class Markdown extends Component {

  props: Props

  static defaultProps: DefaultProps = {
    styles: styles,
    children: '',
  }

  renderContent = (children: string) => {
    const mergedStyles = Object.assign(styles, this.props.styles)
    const rules = _.merge({}, SimpleMarkdown.defaultRules, initialRules(mergedStyles))
    const child = Array.isArray(this.props.children)
      ? this.props.children.join('')
      : this.props.children
    const blockSource = child + '\n\n'
    const tree = SimpleMarkdown.parserFor(rules)(blockSource, { inline: false })
    return SimpleMarkdown.reactFor(SimpleMarkdown.ruleOutput(rules, 'react'))(tree)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.children === nextProps.children &&
      this.props.styles === nextProps.styles
    ) {
      return false
    }
    return true
  }

  render() {
    return (
      <View style={[styles.view, this.props.styles.view]}>
        {this.renderContent(this.props.children)}
      </View>
    )
  }

}

export default Markdown
