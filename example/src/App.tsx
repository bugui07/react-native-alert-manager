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
