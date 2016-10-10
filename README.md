# react-native-simple-markdown
[![Build Status](https://travis-ci.org/CharlesMangwa/react-native-simple-markdown.svg?branch=master)](https://travis-ci.org/CharlesMangwa/react-native-simple-markdown)
[![npm version](https://badge.fury.io/js/react-native-simple-markdown.svg)](https://badge.fury.io/js/react-native-simple-markdown)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badge/)    

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
      #Markdown in react-native is so cool!
      {'\n\n'}
      You can **emphasize** what you want, or just _suggest it_ 😏…
      {'\n\n'}
      You can even [link your website](http://charlesmangwa.surge.sh) or if you prefer: [email sombedy](mailto:email@somebody.com)
      {'\n\n'}
      Spice it up with some GIF 💃:
      {'\n\n'}
      ![Some GIF](https://media.giphy.com/media/dkGhBWE3SyzXW/giphy.gif)
      {'\n\n'}
      And even add a cool video 😎!
      {'\n\n'}
      [![A cool video](https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg)](http://www.youtube.com/watch?v=dQw4w9WgXcQ)
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
- `image` (`<Image>`) - You can use `resizeMode` in `<Markdown />` styles prop to set a resizeMode
- `link` (`Text`)
- `list` (`<View>`) - Also `listItem` (`<View>`), `listItemBullet` (`<Text>`), `listItemNumber` (`<Text>`) and `listItemText` (`<Text>`)
- `mailTo` (`Text`)
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
- `video` (`<Image>`)
- `view` (`<View>`) - This is the `View` container where the Markdown is render.

##### WIP

_Most of these elements can be used, but I'm still working on some improvements. Pull requests are welcome!_

- `autolink` (`<Text>`)
- `blockQuote` (`<Text>`)
- `codeBlock` (`<View>`)
- `newline` (`<Text>`)

## Credits

This project was forked from [`react-native-markdown`](https://github.com/lwansbrough/react-native-markdown) by [@lwansbrough](https://github.com/lwansbrough).
