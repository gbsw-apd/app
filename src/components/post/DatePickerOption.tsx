import React from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../../constants';
import DatePicker from 'react-native-date-picker';

interface DatePickerOptionProps {
  isVisible: boolean;
  date: Date;
  onChangeDate: (date: Date) => void;
  onConfirmDate: () => void;
}

function DatePickerOption({
  isVisible,
  date,
  onChangeDate,
  onConfirmDate,
}: DatePickerOptionProps) {
  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <SafeAreaView style={styles.optionBackground}>
        <View style={styles.optionContainer}>
          <View style={styles.pickerContainer}>
            <DatePicker
              mode="date"
              date={date}
              onDateChange={onChangeDate}
              locale="ko"
            />
          </View>
        </View>
        <View style={styles.optionContainer}>
          <Pressable style={styles.optionButton} onPress={onConfirmDate}>
            <Text style={styles.optionText}>확인</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    alignItems: 'center',
  },
  optionBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0 / 0.5)',
  },
  optionContainer: {
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: colors.GRAY_100,
    overflow: 'hidden',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    gap: 5,
  },
  optionText: {
    color: colors.BLUE_500,
    fontSize: 17,
    fontWeight: '500',
  },
});

export default DatePickerOption;
