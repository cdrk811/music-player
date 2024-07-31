import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import {playbackService} from '../../musicPlayerServices';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ControlCenter = () => {
  const playBackState = usePlaybackState();

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const togglePlayBack = async (playback: State) => {
    const currentTrack = await TrackPlayer.getActiveTrackIndex();

    if (currentTrack !== null) {
      if (playback === State.Paused || playback === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  const isState = (state: any): state is State => {
    return Object.values(State).includes(state);
  };

  let currentState: State | undefined;
  if ('state' in playBackState) {
    currentState = playBackState.state;
  } else {
    currentState = playBackState;
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
        <Icon style={styles.icons} name="skip-previous" size={40} />
      </Pressable>
      <Pressable onPress={() => currentState && isState(currentState) && togglePlayBack(currentState)}>
        <Icon
          style={styles.icons}
          name={currentState === State.Playing ? 'pause' : 'play-arrow'}
          size={75}
        />
      </Pressable>
      <Pressable onPress={skipToNext}>
        <Icon style={styles.icons} name="skip-next" size={40} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icons: {
    color: '#ffffff',
  },
  playButton: {
    marginHorizontal: 24,
  },
});

export default ControlCenter;
