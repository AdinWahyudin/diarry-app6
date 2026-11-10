import React, { useCallback, useRef } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useDiary } from '../../src/context/DiaryContext';
import { useDiarySearch } from '../../src/hooks/useDiarySearch';
import DiaryCard from '../../src/components/DiaryCard';
import { COLORS, SPACE, TYPO, RADIUS } from '../../src/styles/tokens';

const MOOD_FILTERS = ['😊', '🎯', '☕', '🥳', '😴'];

export default function HomeScreen() {
  const router = useRouter();
  const { entries, likedIds, toggleLike } = useDiary();
  const {
    query,
    setQuery,
    selectedMood,
    setSelectedMood,
    filteredEntries,
    resetFilters,
    resultCount,
  } = useDiarySearch(entries);

  const searchRef = useRef<React.ElementRef<typeof TextInput>>(null);

  const openDetail = useCallback(
    (id: number) => {
      router.push({ pathname: '/detail/[id]', params: { id: String(id) } });
    },
    [router]
  );

  const handleReset = useCallback(() => {
    resetFilters();
    searchRef.current?.focus();
  }, [resetFilters]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>

      {/* Bar Pencarian */}
      <View style={styles.searchRow}>
        <TextInput
          ref={searchRef}
          value={query}
          onChangeText={setQuery}
          placeholder="Cari diary..."
          placeholderTextColor={COLORS.muted}
          style={styles.search}
        />
        {(query !== '' || selectedMood !== null) && (
          <Pressable onPress={handleReset} style={styles.resetButton}>
            <Text style={styles.resetText}>Reset</Text>
          </Pressable>
        )}
      </View>

      {/* Filter Mood */}
      <View style={styles.moodFilterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.moodScroll}>
          <Pressable
            onPress={() => setSelectedMood(null)}
            style={[styles.chip, selectedMood === null && styles.chipActive]}
          >
            <Text style={[styles.chipText, selectedMood === null && styles.chipTextActive]}>Semua</Text>
          </Pressable>
          {MOOD_FILTERS.map((m) => (
            <Pressable
              key={m}
              onPress={() => setSelectedMood(selectedMood === m ? null : m)}
              style={[styles.chip, selectedMood === m && styles.chipActive]}
            >
              <Text style={styles.chipEmoji}>{m}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.counter}>{resultCount} entri ditemukan</Text>

      {/* Daftar Diary */}
      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={likedIds.has(item.id)}
            onPress={() => openDetail(item.id)}
            onToggleLike={() => toggleLike(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Diary tidak ditemukan.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACE.m,
  },
  searchRow: {
    flexDirection: 'row',
    gap: SPACE.s,
    marginBottom: SPACE.s,
  },
  search: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.button,
    paddingHorizontal: SPACE.m,
    paddingVertical: 10,
    backgroundColor: COLORS.surface,
    color: COLORS.text,
  },
  resetButton: {
    justifyContent: 'center',
    paddingHorizontal: SPACE.m,
    borderRadius: RADIUS.button,
    backgroundColor: COLORS.accentLight,
  },
  resetText: {
    color: COLORS.accent,
    fontWeight: '700',
  },
  moodFilterContainer: {
    marginVertical: SPACE.xs,
  },
  moodScroll: {
    gap: SPACE.s,
  },
  chip: {
    paddingHorizontal: SPACE.m,
    paddingVertical: 8,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  chipText: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  chipEmoji: {
    fontSize: 16,
  },
  counter: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginVertical: SPACE.s,
  },
  list: {
    gap: SPACE.m,
    paddingBottom: SPACE.xl,
  },
  empty: {
    textAlign: 'center',
    color: COLORS.muted,
    paddingTop: 40,
  },
});