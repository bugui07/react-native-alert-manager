import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  SlideInUp,
  SlideOutUp,
  SlideInLeft,
  SlideOutLeft,
  SlideInRight,
  SlideOutRight,
} from 'react-native-reanimated';
import type { AnimationType } from './AlertManager';
const animationMap = {
  'fade': [FadeIn, FadeOut],
  'slide-up': [SlideInDown, SlideOutDown],
  'slide-down': [SlideInUp, SlideOutUp],
  'slide-left': [SlideInLeft, SlideOutLeft],
  'slide-right': [SlideInRight, SlideOutRight],
};
interface AnimatedContainerProps {
  modalView: React.ReactNode;
  animationType: AnimationType;
  maskColor?: string;
  onClose: () => void;
  maskTouchClosable?: boolean;
}
const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  modalView,
  animationType,
  maskColor,
  onClose,
  maskTouchClosable,
}) => {
  return (
    <Animated.View
      style={[
        styles.container,
        StyleSheet.absoluteFill,
        { backgroundColor: maskColor },
      ]}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.content]}
        entering={
          animationType !== 'fade' ? animationMap[animationType][0] : undefined
        }
        exiting={
          animationType !== 'fade' ? animationMap[animationType][1] : undefined
        }
      >
        <TouchableOpacity
          activeOpacity={1}
          style={StyleSheet.absoluteFill}
          onPress={() => {
            maskTouchClosable && onClose();
          }}
        />
        <View
          onStartShouldSetResponder={() => true}
          style={{ alignItems: 'center' }}
        >
          {modalView}
        </View>
      </Animated.View>
    </Animated.View>
  );
};
export default AnimatedContainer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
