import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReselectInfo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Reselect</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What is Reselect?</Text>
        <Text style={styles.text}>
          Reselect is a library for creating memoized selector functions for Redux.
          Selectors can compute derived data, allowing Redux to store the minimal possible state.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Benefits:</Text>
        <View style={styles.bulletPoints}>
          <Text style={styles.bulletPoint}>• <Text style={styles.bold}>Memoization:</Text> Selectors don't recompute unless inputs change</Text>
          <Text style={styles.bulletPoint}>• <Text style={styles.bold}>Composition:</Text> Selectors can be composed together</Text>
          <Text style={styles.bulletPoint}>• <Text style={styles.bold}>Performance:</Text> Prevents unnecessary re-renders</Text>
          <Text style={styles.bulletPoint}>• <Text style={styles.bold}>Simplicity:</Text> Keeps Redux state minimal</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Example Selector:</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.code}>
            {`const getVisibleTodos = createSelector(
  [getTodos, getFilter],
  (todos, filter) => {
    switch (filter) {
      case 'completed':
        return todos.filter(t => t.completed)
      case 'active':
        return todos.filter(t => !t.completed)
      default:
        return todos
    }
  }
)`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#4630EB',
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  bulletPoints: {
    marginLeft: 5,
  },
  bulletPoint: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 5,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  codeBlock: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#4630EB',
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#333',
  },
});

export default ReselectInfo;
