import { themePadding } from '@/constants/theme';
import { Animated, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import CardTodo from '../CardTodo';
import CheckIcon from '../icons/CheckIcon';
import CloseIcon from '../icons/CloseIcon';
import TrashIcon from '../icons/TrashIcon';

type Props = {
  onComplete: () => void;
  onDelete: () => void;
  toggleFavorite: () => void;
  todo: Todo
};

export default function SwipeableRow({  onComplete, onDelete, todo, toggleFavorite }: Props) {
  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation<number>
  ) => {
    const scale = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View style={[styles.leftAction, { transform: [{ scale }] }]}>
        {todo.completed ? <CloseIcon size={30} /> : <CheckIcon size={30} />}
      </Animated.View>
    );
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>
  ) => {
    const scale = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View style={[styles.rightAction, { transform: [{ scale }] }]}>
        <TrashIcon size={30} />
      </Animated.View>
    );
  };

  return (
    <Swipeable
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableLeftOpen={onComplete}
      onSwipeableRightOpen={onDelete}
      leftThreshold={80}
      rightThreshold={80}
      overshootLeft={false}
      overshootRight={false}
    >
      <CardTodo todo={todo} onToggleFavorite={toggleFavorite} />

    </Swipeable>
  );
}

const styles = StyleSheet.create({
  leftAction: {
    justifyContent: 'flex-start',
    alignSelf: 'center',
    paddingLeft: themePadding.lg,

  },
  rightAction: {
    justifyContent: 'flex-end',
    paddingRight:themePadding.lg,
    alignSelf: 'center',
  },

});