# react-native-alert-manager

A simple and flexible modal/alert manager for React Native with animation support and mask customization. Built on top of `react-native-root-siblings` and `react-native-reanimated`.

## ✨ Features

- Easy to use with static methods
- Supports multiple animation types:
  - `fade`
  - `slide-up`
  - `slide-down`
  - `slide-left`
  - `slide-right`
- Click outside to close (`maskTouchClosable`)
- Customizable mask color
- Reusable singleton alerts

---

## 🚀 Installation

```bash
yarn add react-native-alert-manager react-native-root-siblings react-native-reanimated

```

## 🔧 API

### `AlertManager.show(modalView, options)`
Show a modal view.

| Option               | Type                                                                 | Default               | Description                     |
|----------------------|----------------------------------------------------------------------|------------------------|---------------------------------|
| `key`                | `string`                                                             | —                     | Unique identifier for the alert |
| `maskTouchClosable`  | `boolean`                                                            | `true`                | Tap outside to dismiss alert    |
| `closedCallback`     | `() => void`                                                         | —                     | Called when alert is dismissed  |
| `maskColor`          | `string`                                                             | `'rgba(0, 0, 0, 0.4)'` | Background mask color           |
| `animationType`      | `'fade' \| 'slide-up' \| 'slide-down' \| 'slide-left' \| 'slide-right'` | `'slide-up'`          | Animation direction             |

---

### `AlertManager.hide(key: string)`
Hide and destroy the alert with the given key.

---

### `AlertManager.update(key: string, modalView: React.ReactNode)`
Update the modal content for the given key.

## Example

```bash
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import AlertManager from 'react-native-alert-manager';
import type { AnimationType } from 'react-native-alert-manager';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  return (
    <View style={styles.container}>
      <RootSiblingParent>
        <TouchableOpacity onPress={() => FadeAlert.show('fade')}>
          <Text>Show FadeAlert</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => FadeAlert.show('slide-up')}>
          <Text>Show SlideUpAlert</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => FadeAlert.show('slide-down')}>
          <Text>Show SlideDownAlert</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => FadeAlert.show('slide-left')}>
          <Text>Show SlideLeftAlert</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => FadeAlert.show('slide-right')}>
          <Text>Show SlideRightAlert</Text>
        </TouchableOpacity>
      </RootSiblingParent>
    </View>
  );
}

function ModelView() {
  return (
    <View
      style={{
        width: 200,
        height: 200,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity onPress={() => FadeAlert.hide()}>
        <Text>Hide</Text>
      </TouchableOpacity>
    </View>
  );
}

class FadeAlert {
  static show(animationType: AnimationType) {
    AlertManager.show(<ModelView />, {
      key: 'FadeAlert',
      maskTouchClosable: true,
      closedCallback: () => {
        console.log('FadeAlert closed');
      },
      maskColor: 'rgba(0,0,0,.2)',
      animationType,
    });
  }
  static hide() {
    AlertManager.hide('FadeAlert');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

```