import { ReactNode, useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

function ScreenTransition({
  start,
  onFinish,
  style,
  children,
}: {
  start: boolean;
  onFinish: Animated.EndCallback;
  style: ViewStyle;
  children: ReactNode;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    if (start) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(onFinish);
    }
  }, [fadeAnim, start, onFinish]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {children}
    </Animated.View>
  );
}

export default ScreenTransition;
