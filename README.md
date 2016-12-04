# react-native-simple-markdown
[![Build Status](https://travis-ci.org/CharlesMangwa/react-native-simple-markdown.svg?branch=master)](https://travis-ci.org/CharlesMangwa/react-native-simple-markdown)
[![npm version](https://badge.fury.io/js/react-native-simple-markdown.svg)](https://badge.fury.io/js/react-native-simple-markdown)
[![npm](https://img.shields.io/npm/dm/react-native-simple-markdown.svg?maxAge=2592000)](https://www.npmjs.com/package/react-native-simple-markdown)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badge/)

A component for rendering Markdown in React Native with native components, working with both iOS & Android. Pull requests are welcome 😃 🎉!

## Getting started

`yarn add react-native-simple-markdown`

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

      You can **emphasize** what you want, or just _suggest it_ 😏…

      You can even [link your website](http://charlesmangwa.surge.sh) or if you prefer: [email somebody](mailto:email@somebody.com)

      Spice it up with some GIF 💃:

      ![Some GIF](https://media.giphy.com/media/dkGhBWE3SyzXW/giphy.gif)

      And even add a cool video 😎!

      [![A cool video from YT](https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg)](http://www.youtube.com/watch?v=dQw4w9WgXcQ)

      [![Another one from Vimeo](https://i.vimeocdn.com/video/399486266_640.jpg)](https://vimeo.com/57580368)
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
### `styles`

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

### `rules`

The Markdown will apply its rules by default. However you can pass a `rules` prop to add your own and then customize how the Markdown elements will be displayed!

Example:

```js
<Markdown
  rules={{
    image: {
      react: (node, output, state) => (
        <CustomImageComponent
          key={state.key}
          source={{ uri: node.target }}
        />
      ),
    },
  }}
>
  ![Alt text](/path/to/img.jpg)
</Markdown>
```

RNSM also allows you to remove easily unwanted styling options without having to pass in rule objects that have their react key implemented/dummied to ignore those styling options.

Example:

```js
<Markdown
  styles={ markdownStyles }
  whitelist={['link', 'url']}
>
  { description }
</Markdown>
```

Will only apply the default styles for `link` and `url`. You don't need to pass in a rules prop that contained a key for all the styles you don't want and reimplement their styling output anymore.

### Features
- `blockQuote` (`<View>`) - Also `blockQuoteBar` and `blockQuoteText`
- `br` (`<Text>`)
- `del` (`<Text>`)
- `em` (`<Text>`)
- `hr` (`<View>`)
- `heading` (`<Text>`) - Also `heading1` through `heading6`
- `inlineCode` (`<Text>`)
- `image` (`<Image>`) - You can use `resizeMode` in `<Markdown />` styles prop to set a resizeMode
- `link` (`Text`)
- `list` (`<View>`) - Also `listItem` (`<View>`), `listItemBullet` (`<Text>`), `listItemBulletType` (`Unicode character`), `listItemNumber` (`<Text>`) and `listItemText` (`<Text>`)
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
- `video` (`<Image>`) - Supports Youtube & Vimeo
- `view` (`<View>`) - This is the `View` container where the Markdown is render.

### WIP

_Most of these elements can be used, but I'm still working on some improvements. Pull requests are welcome!_

- `autolink` (`<Text>`)
- `codeBlock` (`<Text>`)

## Credits

This project was forked from [`react-native-markdown`](https://github.com/lwansbrough/react-native-markdown) by [@lwansbrough](https://github.com/lwansbrough).
