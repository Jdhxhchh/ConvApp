import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      let storedHistory = await AsyncStorage.getItem('history');
      storedHistory = storedHistory ? JSON.parse(storedHistory) : [];
      setHistory(storedHistory);
    };
    fetchHistory();
  }, []);

  const clearHistory = async () => {
    await AsyncStorage.removeItem('history');
    setHistory([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Історія Конвертацій</Text>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.historyText}>
              {item.date}: {item.amount} {item.fromCurrency} → {item.result} {item.toCurrency}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.historyList}
      />
      <Button title="Очистити історію" onPress={clearHistory} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  historyList: {
    padding: 20,
  },
  historyItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  historyText: {
    fontSize: 16,
    color: '#333',
  },
});

export default HistoryScreen;
