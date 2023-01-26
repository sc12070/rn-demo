# rn-demo

![](./doc/demo.gif)

Simple application developed with typescript for demonstrating the architecture, file structure and automatic unit test.

Tools used:

> Eslint, Jest, Husky, Redux, async-storage, react-navigation, react-native-responsive-linechat, react-native-sensitive-info, Yahoo finance api

Key tech:

> Animated, Long pulling, Automatical unit test & syntax check before commit

## Installation

```
yarn install
cd ios
pod install
```

## Testing

### unit test

```
yarn jest
```

### End to end test

First time or changed native code

```
yarn detox-build-i;
yarn detox-build-a;
```

iOS

```
yarn detox-test-i
```

Android

```
yarn detox-test-a
```

## Commit

if the following error occured during commit

```
.husky/pre-commit: line 4: yarn: command not found
```

run

```
yarn export-huskyrc
```
