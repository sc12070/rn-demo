# rn-demo

### Installation

```
yarn install
cd ios
pod install
```

### Android storage

Please enable screen lock & fingerprint (Setting -> Security -> Screen Lock/Fingerprint) to allow the application store data into secured shared preference.

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
