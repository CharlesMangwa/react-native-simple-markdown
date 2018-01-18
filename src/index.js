/* @flow */

import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import SimpleMarkdown from 'simple-markdown'
import _ from 'lodash'

import type { DefaultProps, Props } from './types'
import initialRules from './rules'
import initialStyles from './styles'

class Markdown extends Component<Props> {
  static defaultProps: DefaultProps = {
    blacklist: [],
    children: '',
    errorHandler: () => null,
    rules: {},
    styles: initialStyles,
    whitelist: [],
  }

  static propTypes = {
    blacklist: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.string,
    errorHandler: PropTypes.func,
    rules: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    styles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    whitelist: PropTypes.arrayOf(PropTypes.string),
  }

  shouldComponentUpdate = (nextProps: Props): boolean => (
    this.props.children !== nextProps.children ||
    this.props.styles !== nextProps.styles
  )

  // @TODO: Rewrite this part to prevent text from overriding other rules
  /** Post processes rules to strip out unwanted styling options
   *  while keeping the default 'paragraph' and 'text' rules
   */
  _postProcessRules = (preRules: Object): Object => {
    const defaultRules = ['paragraph', 'text']
    if (this.props.whitelist && this.props.whitelist.length) {
      return _.pick(preRules, _.concat(this.props.whitelist, defaultRules))
    }
    else if (this.props.blacklist && this.props.blacklist.length) {
      return _.omit(preRules, _.pullAll(this.props.blacklist, defaultRules))
    }
    return preRules
  }

  _renderContent = (children: string): ?React$Element<any> => {
    try {
      const mergedStyles = Object.assign({}, initialStyles, this.props.styles)
      const rules = this._postProcessRules(
        _.merge(
          {},
          SimpleMarkdown.defaultRules,
          initialRules(mergedStyles),
          this.props.rules,
        ),
      )
      const child = Array.isArray(this.props.children)
        ? this.props.children.join('')
        : this.props.children
      // @TODO: Add another \n?
      const blockSource = `${child}\n`
      const tree = SimpleMarkdown.parserFor(rules)(blockSource, {
        inline: false,
      })
      return SimpleMarkdown.reactFor(SimpleMarkdown.ruleOutput(rules, 'react'))(
        tree,
      )
    }
    catch (errors) {
      this.props.errorHandler
        ? this.props.errorHandler(errors, children)
        : console.error(errors)
    }
    return null
  }

  render() {
    return (
      <View style={[initialStyles.view, this.props.styles.view]}>
        {this._renderContent(this.props.children)}
      </View>
    )
  }
}

export default Markdown
