import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Header } from 'react-native-elements';
import currencies from '../data/currencies.json';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        centerComponent={{ text: 'Обмін Валют', style: styles.headerText }}
        containerStyle={styles.header}
      />
      <FlatList
        data={currencies}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <View style={styles.currencyItem}>
            <Text style={styles.currencyText}>{item.name} ({item.code}): {item.rate}</Text>
          </View>
        )}
        contentContainerStyle={styles.currencyList}
      />
      <View style={styles.buttonContainer}>
        <Button  title="Перейти до конвертера" onPress={() => navigation.navigate('Конвертер')} style={styles.button} />
        <Button style={styles.button} title="Переглянути історію" onPress={() => navigation.navigate('Історія')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ff6600',
    justifyContent: 'space-around',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    color: "#fff",
  },
  currencyList: {
    padding: 20,
  },
  currencyItem: {
    backgroundColor: '#2196f3',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  currencyText: {
    fontSize: 16,
    color: "#fff",
  },
  buttonContainer: {
    padding: 20,
  },
});

export default HomeScreen;
