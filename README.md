# react-native-simple-markdown
[![Dependency Status](https://david-dm.org/CharlesMangwa/react-native-simple-markdown.svg?style=flat)](https://david-dm.org/CharlesMangwa/react-native-simple-markdown.svg)
[![Build Status](https://travis-ci.org/CharlesMangwa/react-native-simple-markdown.svg?branch=master)](https://travis-ci.org/CharlesMangwa/react-native-simple-markdown)
[![npm version](https://badge.fury.io/js/react-native-simple-markdown.svg)](https://badge.fury.io/js/react-native-simple-markdown)

A component for rendering Markdown in React Native with native components, working with both iOS & Android. Pull requests are welcome 😃 🎉!

## Getting started

`npm install react-native-simple-markdown --save`

## Usage

All you need is import the `react-native-simple-markdown` and then use the
`<Markdown />` component.

```js
import React from 'react'
import Markdown from 'react-native-simple-markdown'

const MyAwesomeApp = () => {
  return (
    <Markdown styles={styles}>
      #Who is the best dev in town?
      {'\n\n'}
      Probably **the one** reading this lines 😏…
    </Markdown>    
  )
}

const styles = {
  heading1: {
    fontSize: 22,
  },
  strong: {
    fontSize: 18,
  },
  paragraph: {
    fontSize: 14,
  },
  view: {
    borderWidth: 1,
  },
}
```

## Properties
#### `style`

The Markdown will apply its style by default. However you can pass a `styles` prop to customize it has you want.

Example:

```js
<Markdown
  styles={{
    heading1: {
      fontSize: 20,
    },
    strong: {
      fontWeight: 'bold',
    }
  }}
>
  #Hello 👋
</Markdown>
```
*Note: The text inside the parentheses denotes the element type.*

##### Functional

- `br` (`<Text>`)
- `del` (`<Text>`)
- `em` (`<Text>`)
- `hr` (`<View>`)
- `heading` (`<Text>`) - Also `heading1` through `heading6`
- `inlineCode` (`<Text>`)
- `list` (`<View>`) - Also `listItem` (`<View>`), `listItemBullet` (`<Text>`), `listItemNumber` (`<Text>`) and `listItemText` (`<Text>`)
- `paragraph` (`<View>`)
- `plainText` (`<Text>`) - Use for styling text without any associated styles
- `strong` (`<Text>`)
- `table` (`<View>`)
- `tableHeader` (`<View>`)
- `tableHeaderCell` (`<Text>`)
- `tableRow` (`<View>`)
- `tableRowCell` (`<View>`)
- `tableRowLast` (`<View>`, inherits from `tableRow`)
- `text` (`<Text>`) - Inherited by all text based elements
- `u` (`<View>`)
- `url` (`<Text>`)
- `view` (`<View>`) - This is the container `View` that the Markdown is rendered in.

##### WIP

_Pulll requests are welcome!_

- `autolink` (`<Text>`)
- `blockQuote` (`<Text>`)
- `codeBlock` (`<View>`)
- `image` (`<Image>`) - Usable but need to herit image size
- `link` (`<Text>`)
- `mailto` (`<Text>`)
- `newline` (`<Text>`)

## Credits

This project was forked from [`react-native-markdown`](https://github.com/lwansbrough/react-native-markdown) by [@lwansbrough](https://github.com/lwansbrough).
