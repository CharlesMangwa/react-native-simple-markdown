# react-native-simple-markdown
[![CircleCI](https://circleci.com/gh/CharlesMangwa/react-native-simple-markdown.svg?style=shield&circle-token=4a6119afe938ed7305713fece562bb33d6bc22d8)](https://circleci.com/gh/CharlesMangwa/react-native-simple-markdown)
[![npm downloads](https://img.shields.io/npm/dm/react-native-simple-markdown.svg?maxAge=2592000)](https://www.npmjs.com/package/react-native-simple-markdown)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm version](https://img.shields.io/npm/v/react-native-simple-markdown.svg)](https://www.npmjs.com/package/react-native-simple-markdown)

A component for rendering Markdown in React Native with native components, working with both iOS & Android. Pull requests are welcome! 😃 🎉

## Getting started

`yarn add react-native-simple-markdown`

## Future

This library is currently being (kinda) completely rewritten. If you've been using this lib for a short/long time or are interesting in shaping it for the future: [just chime in and share your thoughts with us](https://github.com/CharlesMangwa/react-native-simple-markdown/issues/75); or give a look at the [styles section](https://github.com/CharlesMangwa/react-native-simple-markdown/tree/next#styles-1), some help is also need there!

## Usage

All you need to do is import the `react-native-simple-markdown` and then use the
`<Markdown />` component.

```js
import React from 'react'
import Markdown from 'react-native-simple-markdown'

const MyAwesomeApp = () => {
  return (
    <Markdown styles={markdownStyles}>
      #Markdown in react-native is so cool! {'\n\n'}

      You can **emphasize** what you want, or just _suggest it_ 😏…{'\n'}

      You can even [**link your website**](https://twitter.com/Charles_Mangwa) or if you prefer: [email somebody](mailto:email@somebody.com){'\n'}

      Spice it up with some GIFs 💃:

      ![Some GIF](https://media.giphy.com/media/dkGhBWE3SyzXW/giphy.gif){'\n'}

      And even add a cool video 😎!{'\n'}

      [![A cool video from YT](https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg)](http://www.youtube.com/watch?v=dQw4w9WgXcQ)

      [![Another one from Vimeo](https://i.vimeocdn.com/video/399486266_640.jpg)](https://vimeo.com/57580368)
    </Markdown>   
  )
}

const markdownStyles = {
  heading1: {
    fontSize: 24,
    color: 'purple',
  },
  link: {
    color: 'pink',
  },
  mailTo: {
    color: 'orange',
  },
  text: {
    color: '#555555',
  },
}
```

## Properties
### `styles`

`<Markdown />` will apply its style by default. However you can pass a `styles` prop to customize it has you wish.

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

Here again, `<Markdown />` will apply its rules by default. However you can pass a `rules` prop to add your own and then customize how the Markdown elements will be displayed!

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

`whitelist` will only apply `link` and `url` default styles, while `blacklist` will do the opposite. You don't need to pass in a rules prop that contained a key for all the styles you don't want and reimplement their styling output anymore.

### errorHandler

If you happened to have an error with your Markdown during the rendering, you can pass a `errorHandler` with a function that will let you see what's going on:

```jsx
<Markdown
  errorHandler={(errors, children) => console.log(errors, children)}
>
...
</Markdown>

```

## Styles

Given that the way React Native renders element has evolved in the latest versions (0.48+), we'll have to check manually that every single rule works as expected by:
- rendering properly on both iOS & Android
- being able to be styled on both platforms
- not breaking/overriding others rules when its own is applied

When those 3 criteria are fulfilled, we can validate the **Rendering** column. Feel free to check any of these and send a PR to validate it [on Snack](https://snack.expo.io/By2dzl04G)!

| Property | Type | Rendering | Features |
| ------ | ------ |  ------ |  ------ |
| `blockQuote` | `<View>` | ❌ | Also `blockQuoteBar` (`<View>`) and `blockQuoteText` (`<Text>`) |
| `br` | `<Text>` | ❌ | - |
| `del` | `<Text>` | ❌ | - |
| `em` | `<Text>` | ❌ | - |
| `hr` | `<View>` | ❌ | - |
| `heading` | `<Text>` | ❌ | Also `heading1` through `heading6` |
| `image` | `<Image>` | ❌ | ou can use `resizeMode` in `<Markdown />` styles prop to set a `resizeMode` |
| `inlineCode` | `<Text>` | ❌ | - |
| `link` | `<Text>` | ❌ | - |
| `list` | `<View>` | ❌ | Also `listItem` (`<View>`), `listItemBullet` (`<Text>`), `listItemBulletType` (`Unicode character`), `listItemNumber` (`<Text>`) and `listItemText` (`<Text>`) |
| `mailTo` | `<Text>` | ❌ | - |
| `paragraph` | `<View>` | ❌ | - |
| `plainText` | `<Text>` | ❌ | Used for styling text without any associated styles |
| `strong` | `<Text>` | ❌ | - |
| `table` | `<View>` | ❌ | - |
| `tableHeader` | `<View>` | ❌ | - |
| `tableHeaderCell` | `<View>` | ❌ | - |
| `tableRow` | `<View>` | ❌ | - |
| `tableRowCell` | `<View>` | ❌ | - |
| `tableRowLast` | `<View>` | ❌ | Inherits from `tableRow` |
| `text` | `<Text>` | ❌ | - |
| `u` | `<Text>` | ❌ | - |
| `url` | `<Text>` | ❌ | - |
| `video` | `<Image>` | ❌ | Supports YouTube & Vimeo |
| `view` | `<View>` | ❌ | This is the `View` container where the Markdown is rendered |

## Credits

This project was forked from [`react-native-markdown`](https://github.com/lwansbrough/react-native-markdown) by [@lwansbrough](https://github.com/lwansbrough) 👍
