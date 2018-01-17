'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _simpleMarkdown = require('simple-markdown');

var _simpleMarkdown2 = _interopRequireDefault(_simpleMarkdown);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (styles) {
  return {
    autolink: {
      react: function react(node, output, state) {
        state.withinText = true;
        return (0, _react.createElement)(_reactNative.Text, {
          key: state.key,
          style: styles.link,
          onPress: _lodash2.default.noop
        }, output(node.content, state));
      }
    },
    blockQuote: {
      react: function react(node, output, state) {
        state.withinText = true;
        var blockBar = (0, _react.createElement)(_reactNative.View, {
          key: state.key,
          style: [styles.blockQuoteSectionBar, styles.blockQuoteBar]
        });
        var blockText = (0, _react.createElement)(_reactNative.Text, {
          key: state.key,
          style: styles.blockQuoteText
        }, output(node.content, state));
        return (0, _react.createElement)(_reactNative.View, { key: state.key, style: [styles.blockQuoteSection, styles.blockQuote] }, [blockBar, blockText]);
      }
    },
    br: {
      react: function react(node, output, state) {
        return (0, _react.createElement)(_reactNative.Text, {
          key: state.key,
          style: styles.br
        }, '\n\n');
      }
    },
    codeBlock: {
      react: function react(node, output, state) {
        state.withinText = true;
        return (0, _react.createElement)(_reactNative.Text, {
          key: state.key,
          style: styles.codeBlock
        }, null);
      }
    },
    del: {
      react: function react(node, output, state) {
        state.withinText = true;
        return (0, _react.createElement)(_reactNative.Text, {
          key: state.key,
          style: styles.del
        }, output(node.content, state));
      }
    },
    em: {
      react: function react(node, output, state) {
        state.withinText = true;
        return (0, _react.createElement)(_reactNative.Text, {
          key: state.key,
          style: styles.em
        }, output(node.content, state));
      }
    },
    heading: {
      react: function react(node, output, parentState) {
        var state = _extends({}, parentState);
        state.withinText = true;
        var stylesToApply = [styles.heading, styles['heading' + node.level]];
        state.stylesToApply = stylesToApply;
        return (0, _react.createElement)(_reactNative.Text, {
          key: state.key,
          style: stylesToApply
        }, output(node.content, state));
      }
    },
    hr: {
      react: function react(node, output, state) {
        return (0, _react.createElement)(_reactNative.View, { key: state.key, style: styles.hr });
      }
    },
    image: {
      react: function react(node, output, state) {
        return (0, _react.createElement)(_reactNative.Image, {
          key: state.key,
          resizeMode: styles.resizeMode ? styles.resizeMode : 'contain',
          source: { uri: node.target },
          style: node.target.match(/youtu|vimeo/) ? styles.video : styles.image
        });
      }
    },
    inlineCode: {
      react: function react(node, output, state) {
        state.withinText = true;
        return (0, _react.createElement)(_reactNative.Text, {
          key: state.key,
          style: styles.inlineCode
        }, node.content);
      }
    },
    link: {
      react: function react(node, output, state) {
        state.withinText = true;
        var openUrl = function openUrl(url) {
          _reactNative.Linking.openURL(url).catch(function (error) {
            return console.warn('An error occurred: ', error);
          });
        };
        return (0, _react.createElement)(_reactNative.Text, {
          style: node.target.match(/@/) ? styles.mailTo : styles.link,
          key: state.key,
          onPress: function onPress() {
            return openUrl(node.target);
          }
        }, output(node.content, state));
      }
    },
    list: {
      react: function react(node, output, state) {
        var items = _lodash2.default.map(node.items, function (item, i) {
          var bullet = void 0;
          if (node.ordered) {
            bullet = (0, _react.createElement)(_reactNative.Text, { key: state.key, style: styles.listItemNumber }, i + 1 + '. ');
          } else {
            bullet = (0, _react.createElement)(_reactNative.Text, { key: state.key, style: styles.listItemBullet }, styles.listItemBulletType ? styles.listItemBulletType + ' ' : '\u2022 ');
          }
          var listItemText = (0, _react.createElement)(_reactNative.Text, { key: state.key + 1, style: styles.listItemText }, output(item, state));
          return (0, _react.createElement)(_reactNative.View, {
            key: i,
            style: styles.listItem
          }, [bullet, listItemText]);
        });
        return (0, _react.createElement)(_reactNative.View, { key: state.key, style: styles.list }, items);
      }
    },
    newline: {
      react: function react(node, output, state) {
        return (0, _react.createElement)(_reactNative.Text, {
          key: state.key,
          style: styles.newline
        }, '\n');
      }
    },
    paragraph: {
      react: function react(node, output, state) {
        return (0, _react.createElement)(_reactNative.View, {
          key: state.key,
          style: styles.paragraph
        }, output(node.content, state));
      }
    },
    strong: {
      react: function react(node, output, state) {
        state.withinText = true;
        return (0, _react.createElement)(_reactNative.Text, {
          key: state.key,
          style: styles.strong
        }, output(node.content, state));
      }
    },
    table: {
      react: function react(node, output, state) {
        var headers = _lodash2.default.map(node.header, function (content, i) {
          return (0, _react.createElement)(_reactNative.Text, {
            style: styles.tableHeaderCell
          }, output(content, state));
        });

        var header = (0, _react.createElement)(_reactNative.View, { style: styles.tableHeader }, headers);

        var rows = _lodash2.default.map(node.cells, function (row, r) {
          var cells = _lodash2.default.map(row, function (content, c) {
            return (0, _react.createElement)(_reactNative.View, {
              key: c,
              style: styles.tableRowCell
            }, output(content, state));
          });
          var rowStyles = [styles.tableRow];
          node.cells.length - 1 == r ? rowStyles.push(styles.tableRowLast) : null;
          return (0, _react.createElement)(_reactNative.View, { key: r, style: rowStyles }, cells);
        });

        return (0, _react.createElement)(_reactNative.View, { key: state.key, style: styles.table }, [header, rows]);
      }
    },
    text: {
      react: function react(node, output, parentState) {
        var state = _extends({}, parentState);
        // Breaking words up in order to allow for text reflowing in flexbox
        var words = node.content.split(' ');
        words = _lodash2.default.map(words, function (word, i) {
          var elements = [];
          i != words.length - 1 ? word = word + ' ' : null;
          var textStyles = [styles.text];
          !state.withinText ? textStyles.push(styles.plainText) : null;
          state.stylesToApply ? textStyles.push(state.stylesToApply) : null;
          return (0, _react.createElement)(_reactNative.Text, {
            key: i,
            style: textStyles
          }, word);
        });
        return words;
      }
    },
    u: {
      react: function react(node, output, state) {
        state.withinText = true;
        return (0, _react.createElement)(_reactNative.Text, {
          key: state.key,
          style: styles.u
        }, output(node.content, state));
      }
    },
    url: {
      react: function react(node, output, state) {
        state.withinText = true;
        var openUrl = function openUrl(url) {
          _reactNative.Linking.openURL(url).catch(function (error) {
            return console.warn('An error occurred: ', error);
          });
        };
        return (0, _react.createElement)(_reactNative.Text, {
          key: state.key,
          style: styles.url,
          onPress: openURL(node.target)
        }, output(node.content, state));
      }
    }
  };
};