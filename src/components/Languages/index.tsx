import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';

const LanguageSwitcher: React.FC = () => {
	const actionSheetRef = useRef<ActionSheet | null>(null);

  const handleLanguageChange = (index: number) => {
    if (index === 0) {
      // Xử lý chuyển đổi sang Tiếng Anh
    } else if (index === 1) {
      // Xử lý chuyển đổi sang Tiếng Việt
    }
    actionSheetRef.current?.setModalVisible(false); // Đóng ActionSheet sau khi chọn
  };

  const showActionSheet = () => {
    actionSheetRef.current?.setModalVisible(true);
  };

  return (
    <View>
			<TouchableOpacity onPress={showActionSheet} style={styles.dropdown}>

				<Image source={require('theme/assets/images/VN.png')} style={styles.dropdownImage}/>
				<Text style={styles.dropdownText}>VIE</Text>

      </TouchableOpacity>
			<View style={styles.boxDropdown}>
				<ActionSheet ref={actionSheetRef}>
					<TouchableOpacity onPress={() => handleLanguageChange(0)}>
						<Text style={styles.boxText}>Tiếng Anh</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => handleLanguageChange(1)}>
						<Text style={styles.boxText}>Tiếng Việt</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => actionSheetRef.current?.setModalVisible(false)}>
						<Text style={[styles.boxText, styles.boxText__cancel]}>Cancel</Text>
					</TouchableOpacity>
      </ActionSheet>
			</View>
    </View>
  );
};

export default LanguageSwitcher;

const styles = StyleSheet.create({
	dropdown: {
		flexDirection: 'row',
		position: 'absolute',
		top: 20,
		right: 20,
	},
	dropdownText: {
		color: '#fff',
		fontWeight: 'bold',
		fontFamily: 'Inter',
	},
	dropdownImage: {
		width: 20,
		height: 20,
		borderRadius: 10,
		marginRight: 10,
	},
	boxDropdown: {
		alignSelf: 'center',
		marginBottom: 20,
		paddingTop: 20,
	},
	boxText: {
		alignSelf: 'center',
		fontFamily: 'Inter',
		fontWeight: 'bold',
		lineHeight: 30,
	},
	boxText__cancel: {
		color: '#f00',
	},
});
