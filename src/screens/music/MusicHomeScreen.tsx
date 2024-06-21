import React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import Music from '../../components/music/Music';

function MusicHomeScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://www.adns.kr/news/photo/202103/12397_23407_2935.jpg',
        }}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <Music />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default MusicHomeScreen;
