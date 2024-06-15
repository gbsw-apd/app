import React from 'react';
import {StyleSheet} from 'react-native';
import HeaderButton from '../common/HeaderButton';

function CalendarHomeHeaderRight(onPress: () => void) {
  return <HeaderButton labelText="오늘" onPress={onPress} />;
}

const styles = StyleSheet.create({});

export default CalendarHomeHeaderRight;
