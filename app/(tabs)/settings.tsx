// app/(tabs)/settings.tsx
import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  const [compactMode, setCompactMode] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pengaturan</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Compact Mode</Text>
        <Switch
          value={compactMode}
          onValueChange={setCompactMode}
        />
      </View>

      <Text style={styles.info}>
        State: {compactMode ? 'Aktif' : 'Nonaktif'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8FAFC',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#0F172A',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  label: {
    fontSize: 16,
    color: '#0F172A',
  },
  info: {
    marginTop: 12,
    color: '#6B7280',
    fontSize: 14,
  },
});