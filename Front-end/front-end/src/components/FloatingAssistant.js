import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../constants/theme';

export default function FloatingChatButton({ onPress }) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <FontAwesome5 name="robot" size={28} color={COLORS.white} solid />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.medium,
        zIndex: 999,
    },
});
