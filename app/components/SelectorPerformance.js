import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { getTodos, getFilteredTodos } from '../redux/selectors';

// Component to demonstrate reselect performance benefits
const SelectorPerformance = () => {
  const dispatch = useDispatch();
  const [renderCount, setRenderCount] = useState({
    withoutReselect: 0,
    withReselect: 0
  });
  
  // Get todos from state
  const todos = useSelector(getTodos);
  
  // Example of a selector without memoization
  const getFilteredTodosWithoutMemoization = (state, filter) => {
    console.log('Computing filtered todos without memoization');
    const allTodos = state.todos.todos;
    
    switch (filter) {
      case 'completed':
        return allTodos.filter(todo => todo.completed);
      case 'active':
        return allTodos.filter(todo => !todo.completed);
      default:
        return allTodos;
    }
  };
  
  // Using the non-memoized selector
  const activeTodosWithoutMemoization = useSelector(state => {
    const result = getFilteredTodosWithoutMemoization(state, 'active');
    setRenderCount(prev => ({
      ...prev,
      withoutReselect: prev.withoutReselect + 1
    }));
    return result;
  });
  
  // Using the memoized selector from our selectors.js
  const activeTodosWithMemoization = useSelector(state => {
    const result = getFilteredTodos(state);
    setRenderCount(prev => ({
      ...prev,
      withReselect: prev.withReselect + 1
    }));
    return result.filter(todo => !todo.completed);
  });
  
  // Create a factory selector for demonstration
  const makeGetTodosByCategory = () => {
    return createSelector(
      [getTodos, (_, category) => category],
      (todos, category) => {
        console.log(`Computing todos for category: ${category}`);
        return todos.filter(todo => todo.category === category);
      }
    );
  };
  
  // Create instances of the factory selector
  const getStudyTodos = makeGetTodosByCategory();
  const getWorkTodos = makeGetTodosByCategory();
  
  // Use the factory selectors
  const studyTodos = useSelector(state => getStudyTodos(state, 'study'));
  const workTodos = useSelector(state => getWorkTodos(state, 'work'));
  
  // Trigger a UI state change that shouldn't recompute selectors
  const toggleTheme = useCallback(() => {
    dispatch({ type: 'SET_THEME', payload: Math.random() > 0.5 ? 'light' : 'dark' });
  }, [dispatch]);
  
  // Add a new todo to trigger selector recalculation
  const addTodo = useCallback(() => {
    dispatch({ 
      type: 'ADD_TODO', 
      payload: { 
        text: `New Todo ${Date.now()}`, 
        category: Math.random() > 0.5 ? 'study' : 'work' 
      } 
    });
  }, [dispatch]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selector Performance</Text>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleTheme}>
          <Text style={styles.buttonText}>Toggle Theme</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>Add Todo</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.counterContainer}>
        <Text style={styles.sectionTitle}>Computation Count</Text>
        <View style={styles.counterRow}>
          <View style={styles.counterItem}>
            <Text style={styles.counterLabel}>Without Reselect:</Text>
            <Text style={styles.counterValue}>{renderCount.withoutReselect}</Text>
          </View>
          <View style={styles.counterItem}>
            <Text style={styles.counterLabel}>With Reselect:</Text>
            <Text style={styles.counterValue}>{renderCount.withReselect}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.resultsContainer}>
        <Text style={styles.sectionTitle}>Results</Text>
        
        <View style={styles.resultSection}>
          <Text style={styles.resultTitle}>Active Todos (Without Memoization)</Text>
          <ScrollView style={styles.resultList}>
            {activeTodosWithoutMemoization.map(todo => (
              <Text key={todo.id} style={styles.resultItem}>{todo.text}</Text>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.resultSection}>
          <Text style={styles.resultTitle}>Active Todos (With Memoization)</Text>
          <ScrollView style={styles.resultList}>
            {activeTodosWithMemoization.map(todo => (
              <Text key={todo.id} style={styles.resultItem}>{todo.text}</Text>
            ))}
          </ScrollView>
        </View>
      </View>
      
      <View style={styles.factoryContainer}>
        <Text style={styles.sectionTitle}>Factory Selectors</Text>
        
        <View style={styles.factoryRow}>
          <View style={styles.factoryColumn}>
            <Text style={styles.factoryTitle}>Study Todos</Text>
            <ScrollView style={styles.factoryList}>
              {studyTodos.map(todo => (
                <Text key={todo.id} style={styles.factoryItem}>{todo.text}</Text>
              ))}
            </ScrollView>
          </View>
          
          <View style={styles.factoryColumn}>
            <Text style={styles.factoryTitle}>Work Todos</Text>
            <ScrollView style={styles.factoryList}>
              {workTodos.map(todo => (
                <Text key={todo.id} style={styles.factoryItem}>{todo.text}</Text>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Performance Benefits</Text>
        <Text style={styles.infoText}>
          Reselect memoizes the results of selectors, preventing unnecessary recalculations when the inputs haven't changed.
        </Text>
        <Text style={styles.infoText}>
          Notice how the "Without Reselect" counter increases more frequently than the "With Reselect" counter when you toggle the theme.
        </Text>
        <Text style={styles.infoText}>
          Factory selectors allow you to create reusable selectors that can accept parameters.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4630EB',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  counterContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  counterItem: {
    alignItems: 'center',
    flex: 1,
  },
  counterLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  counterValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4630EB',
  },
  resultsContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  resultSection: {
    marginBottom: 15,
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  resultList: {
    maxHeight: 80,
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
  },
  resultItem: {
    fontSize: 14,
    marginBottom: 4,
  },
  factoryContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  factoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  factoryColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  factoryTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  factoryList: {
    maxHeight: 80,
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
  },
  factoryItem: {
    fontSize: 14,
    marginBottom: 4,
  },
  infoContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 15,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default SelectorPerformance;
