import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, Keyframe } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

const DURATION = 600;

export function AnimatedSplashOverlay() {
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const splashKeyframe = new Keyframe({
    0: { transform: [{ scale: 1 }], opacity: 1 },
    20: { opacity: 1 },
    70: { opacity: 0, easing: Easing.elastic(0.7) },
    100: { opacity: 0, transform: [{ scale: 1 }], easing: Easing.elastic(0.7) },
  });

  const image = <Image style={styles.image} source={require('@/assets/images/icon.png')} />;

  return animate ? (
    <Animated.View
      entering={splashKeyframe.duration(DURATION).withCallback((finished) => {
        'worklet';
        if (finished) {
          scheduleOnRN(setVisible, false);
        }
      })}
      style={styles.splashOverlay}>
      {image}
    </Animated.View>
  ) : (
    <View
      onLayout={() => setAnimate(true)}   
      style={styles.splashOverlay}>
      {image}
    </View>
  );
}


export function Icon() {
  return (
    <View style={styles.iconContainer}>
     <Image
      source={require('@/assets/images/cute.png')}
      style={styles.image}
      contentFit="contain"
    />
    </View>
  );
}

const styles = StyleSheet.create({

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    zIndex: 100,
  },
  image: {
    width: 100,
    height: 80,
  },
  splashOverlay:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#af87f3',
  }

});
