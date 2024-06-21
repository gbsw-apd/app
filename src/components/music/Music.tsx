import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../constants';

const musicFiles = {
  rain: require('../../assets/rain.mp3'),
  nature: require('../../assets/nature.mp3'),
  tide: require('../../assets/tide.mp3'),
  waterfall: require('../../assets/waterfall.mp3'),
};

function Music() {
  const [sound, setSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<{[key: string]: boolean}>(() =>
    Object.fromEntries(Object.keys(musicFiles).map(key => [key, false])),
  );
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [currentPlayingSound, setCurrentPlayingSound] = useState<string | null>(
    null,
  );

  useEffect(() => {
    return () => {
      if (sound) {
        sound.stop(() => {
          sound.release();
        });
      }
    };
  }, [sound]);

  const toggleSound = (soundName: keyof typeof musicFiles) => {
    if (isPlaying[soundName]) {
      sound?.stop(() => {
        if (sound) {
          setIsPlaying({...isPlaying, [soundName]: false});
        }
        setCurrentPlayingSound(null);
      });
    } else {
      if (sound) {
        sound.stop(() => {
          sound.release();
        });
      }

      const newSound = new Sound(musicFiles[soundName], error => {
        if (error) {
          console.log('음악 로드 실패', error);
          return;
        }

        setSound(newSound);
        setIsPlaying({...isPlaying, [soundName]: true});
        setCurrentPlayingSound(soundName);

        newSound.play(success => {
          if (!success) {
            console.log('재생 실패');
          }
        });
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.titleContainer}>
          <Icon name="music-note" size={30} color={colors.BLACK} />
          <Text style={styles.title}>의성의 소리</Text>
        </View>
        {Object.keys(musicFiles).map(soundName => (
          <TouchableOpacity
            key={soundName}
            style={[
              styles.buttonStyle,
              activeButton === soundName && styles.activeButtonStyle,
            ]}
            onPress={() => toggleSound(soundName as keyof typeof musicFiles)}>
            <Icon
              name="queue-music"
              size={25}
              color={activeButton === soundName ? colors.WHITE : colors.BLACK}
              style={styles.buttonIcon}
            />
            <Text
              style={[
                styles.buttonText,
                activeButton === soundName && styles.activeButtonText,
              ]}>
              {soundName}
            </Text>
            <Icon
              name={currentPlayingSound === soundName ? 'pause' : 'play-arrow'}
              size={25}
              color={activeButton === soundName ? colors.WHITE : colors.BLACK}
            />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 75,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.BLACK,
    marginLeft: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 5,
    paddingHorizontal: 20,
    height: 60,
    width: 250,
    justifyContent: 'space-between',
    borderRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.5,
    elevation: 2,
  },
  activeButtonStyle: {
    backgroundColor: colors.BLACK,
  },
  buttonText: {
    color: colors.BLACK,
    fontSize: 20,
    fontWeight: 'bold',
  },
  activeButtonText: {
    color: colors.WHITE,
  },
  buttonIcon: {
    marginRight: 10,
  },
});

export default Music;
