# rn-demo

![](./doc/demo.gif)

Simple application developed with typescript for demonstrating the architecture, file structure and automatic unit test.

Tools used:

> Eslint, Jest, Husky, Redux, async-storage, react-navigation, react-native-responsive-linechat, react-native-sensitive-info, Yahoo finance api

Key tech:

> Animated, Long pulling, Automatical unit test & syntax check before commit

### Installation

```
yarn install
cd ios
pod install
```

### Testing

```
yarn jest
```

### Commit

if the following error occured during commit

```
.husky/pre-commit: line 4: yarn: command not found
```

run

```
yarn export-huskyrc
```
