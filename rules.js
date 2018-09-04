import { createElement } from "react";
import { Image, Text, View, Linking } from "react-native";
import _ from "lodash";

export default (styles, allowFontScaling) => ({
  autolink: {
    react: (node, output, state) => {
      state.withinText = true;
      return createElement(
        Text,
        {
          key: state.key,
          style: styles.link,
          onPress: _.noop,
          allowFontScaling
        },
        output(node.content, state)
      );
    }
  },
  blockQuote: {
    react: (node, output, state) => {
      state.withinText = true;
      const blockBar = createElement(View, {
        key: state.key,
        style: [styles.blockQuoteSectionBar, styles.blockQuoteBar]
      });
      const blockText = createElement(
        Text,
        {
          key: state.key + 1,
          style: styles.blockQuoteText,
          allowFontScaling
        },
        output(node.content, state)
      );
      return createElement(
        View,
        {
          key: state.key,
          style: [styles.blockQuoteSection, styles.blockQuote]
        },
        [blockBar, blockText]
      );
    }
  },
  br: {
    react: (node, output, state) => {
      return createElement(
        Text,
        {
          key: state.key,
          style: styles.br,
          allowFontScaling
        },
        "\n\n"
      );
    }
  },
  codeBlock: {
    react: (node, output, state) => {
      state.withinText = true;
      return createElement(
        Text,
        {
          key: state.key,
          style: styles.codeBlock,
          allowFontScaling
        },
        null
      );
    }
  },
  del: {
    react: (node, output, state) => {
      state.withinText = true;
      return createElement(
        Text,
        {
          key: state.key,
          style: styles.del,
          allowFontScaling
        },
        output(node.content, state)
      );
    }
  },
  em: {
    react: (node, output, state) => {
      state.withinText = true;
      return createElement(
        Text,
        {
          key: state.key,
          style: styles.em,
          allowFontScaling
        },
        output(node.content, state)
      );
    }
  },
  heading: {
    react: (node, output, parentState) => {
      const state = { ...parentState };
      state.withinText = true;
      const stylesToApply = [styles.heading, styles["heading" + node.level]];
      state.stylesToApply = stylesToApply;
      return createElement(
        Text,
        {
          key: state.key,
          style: stylesToApply,
          allowFontScaling
        },
        output(node.content, state)
      );
    }
  },
  hr: {
    react: (node, output, state) => {
      return createElement(View, { key: state.key, style: styles.hr });
    }
  },
  image: {
    react: (node, output, state) => {
      return createElement(Image, {
        key: state.key,
        resizeMode: styles.resizeMode ? styles.resizeMode : "contain",
        source: { uri: node.target },
        style: node.target.match(/youtu|vimeo/) ? styles.video : styles.image
      });
    }
  },
  inlineCode: {
    react: (node, output, state) => {
      state.withinText = true;
      return createElement(
        Text,
        {
          key: state.key,
          style: styles.inlineCode,
          allowFontScaling
        },
        node.content
      );
    }
  },
  link: {
    react: (node, output, state) => {
      state.withinText = true;
      const openUrl = url => {
        Linking.openURL(url).catch(error =>
          console.warn("An error occurred: ", error)
        );
      };
      return createElement(
        Text,
        {
          style: node.target.match(/@/) ? styles.mailTo : styles.link,
          key: state.key,
          onPress: () => openUrl(node.target),
          allowFontScaling
        },
        output(node.content, state)
      );
    }
  },
  list: {
    react: (node, output, state) => {
      const items = _.map(node.items, (item, i) => {
        let bullet;
        if (node.ordered) {
          bullet = createElement(
            Text,
            { key: state.key, style: styles.listItemNumber, allowFontScaling },
            i + 1 + ". "
          );
        } else {
          bullet = createElement(
            Text,
            { key: state.key, style: styles.listItemBullet, allowFontScaling },
            styles.listItemBulletType
              ? `${styles.listItemBulletType} `
              : "\u2022 "
          );
        }
        const listItemText = createElement(
          Text,
          { key: state.key + 1, style: styles.listItemText, allowFontScaling },
          output(item, state)
        );
        return createElement(
          View,
          {
            key: i,
            style: styles.listItem
          },
          [bullet, listItemText]
        );
      });
      return createElement(View, { key: state.key, style: styles.list }, items);
    }
  },
  newline: {
    react: (node, output, state) => {
      return createElement(
        Text,
        {
          key: state.key,
          style: styles.newline,
          allowFontScaling
        },
        "\n"
      );
    }
  },
  paragraph: {
    react: (node, output, state) => {
      return createElement(
        View,
        {
          key: state.key,
          style: styles.paragraph
        },
        output(node.content, state)
      );
    }
  },
  strong: {
    react: (node, output, state) => {
      state.withinText = true;
      return createElement(
        Text,
        {
          key: state.key,
          style: styles.strong,
          allowFontScaling
        },
        output(node.content, state)
      );
    }
  },
  table: {
    react: (node, output, state) => {
      const headers = _.map(node.header, (content, i) => {
        return createElement(
          Text,
          {
            style: styles.tableHeaderCell,
            allowFontScaling
          },
          output(content, state)
        );
      });

      const header = createElement(
        View,
        { style: styles.tableHeader },
        headers
      );

      const rows = _.map(node.cells, (row, r) => {
        const cells = _.map(row, (content, c) => {
          return createElement(
            View,
            {
              key: c,
              style: styles.tableRowCell
            },
            output(content, state)
          );
        });
        const rowStyles = [styles.tableRow];
        node.cells.length - 1 == r ? rowStyles.push(styles.tableRowLast) : null;
        return createElement(View, { key: r, style: rowStyles }, cells);
      });

      return createElement(View, { key: state.key, style: styles.table }, [
        header,
        rows
      ]);
    }
  },
  text: {
    react: (node, output, parentState) => {
      const state = { ...parentState };
      // Breaking words up in order to allow for text reflowing in flexbox
      let words = node.content.split(" ");
      words = _.map(words, (word, i) => {
        i != words.length - 1 ? (word = word + " ") : null;
        const textStyles = [styles.text];
        !state.withinText ? textStyles.push(styles.plainText) : null;
        state.stylesToApply ? textStyles.push(state.stylesToApply) : null;
        return createElement(
          Text,
          {
            style: textStyles,
            key: i,
            allowFontScaling
          },
          word
        );
      });
      return words;
    }
  },
  u: {
    react: (node, output, state) => {
      state.withinText = true;
      return createElement(
        Text,
        {
          key: state.key,
          style: styles.u,
          allowFontScaling
        },
        output(node.content, state)
      );
    }
  },
  url: {
    react: (node, output, state) => {
      state.withinText = true;
      const openUrl = url => {
        Linking.openURL(url).catch(error =>
          console.warn("An error occurred: ", error)
        );
      };
      return createElement(
        Text,
        {
          key: state.key,
          style: styles.url,
          onPress: openUrl(node.target),
          allowFontScaling
        },
        output(node.content, state)
      );
    }
  }
});
