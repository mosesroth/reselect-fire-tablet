import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';
import ErrorBoundary from './components/ErrorBoundary';
import SimpleTodoList from './components/SimpleTodoList';
import FilterControls from './components/FilterControls';
import ReselectInfo from './components/ReselectInfo';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.header}>Reselect Demo</Text>
          <Text style={styles.subheader}>Efficient derived data for Redux</Text>
          
          <ErrorBoundary>
            <FilterControls />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <SimpleTodoList />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <ReselectInfo />
          </ErrorBoundary>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Powered by reselect
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingVertical: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 12,
  },
});

export default App;
