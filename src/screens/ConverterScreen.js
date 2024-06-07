import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import currencies from '../data/currencies.json';

const ConverterScreen = () => {
  const [fromCurrency, setFromCurrency] = useState(currencies[0].code);
  const [toCurrency, setToCurrency] = useState(currencies[1].code);
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);

  const convertCurrency = () => {
    const fromRate = currencies.find(currency => currency.code === fromCurrency).rate;
    const toRate = currencies.find(currency => currency.code === toCurrency).rate;
    const convertedAmount = (amount / fromRate) * toRate;
    setResult(convertedAmount.toFixed(2));

    saveToHistory({
      fromCurrency,
      toCurrency,
      amount,
      result: convertedAmount.toFixed(2),
      date: new Date().toLocaleString(),
    });
  };

  const saveToHistory = async (conversion) => {
    let history = await AsyncStorage.getItem('history');
    history = history ? JSON.parse(history) : [];
    history.push(conversion);
    await AsyncStorage.setItem('history', JSON.stringify(history));
  };

  return (
    <View style={styles.container}>
      <View stle={styles.secondContainer}>
        <Text style={styles.title}>Конвертер Валют</Text>
        <Picker selectedValue={fromCurrency} onValueChange={(itemValue) => setFromCurrency(itemValue)} style={styles.picker}>
          {currencies.map(currency => (
            <Picker.Item key={currency.code} label={`${currency.name} (${currency.code})`} value={currency.code} />
          ))}
        </Picker>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Сума"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />
        <Picker selectedValue={toCurrency} onValueChange={(itemValue) => setToCurrency(itemValue)} style={styles.picker}>
          {currencies.map(currency => (
            <Picker.Item key={currency.code} label={`${currency.name} (${currency.code})`} value={currency.code} />
          ))}
        </Picker>
        <Button title="Конвертувати" onPress={convertCurrency} />
        {result && <Text style={styles.result}>Результат: {result}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  secondContainer: {
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});

export default ConverterScreen;
