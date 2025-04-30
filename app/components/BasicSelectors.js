import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { getFilteredTodos, getTodoStats } from '../redux/selectors';

const BasicSelectors = () => {
  // Using the reselect selectors
  const filteredTodos = useSelector(getFilteredTodos);
  const todoStats = useSelector(getTodoStats);
  
  // Get the current filter from state
  const filter = useSelector(state => state.todos.filter);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Basic Selectors</Text>
      
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Todo Statistics</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{todoStats.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{todoStats.completed}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{todoStats.active}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{todoStats.percentCompleted}%</Text>
            <Text style={styles.statLabel}>Progress</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.todosContainer}>
        <Text style={styles.sectionTitle}>
          {filter === 'all' ? 'All Todos' : 
           filter === 'completed' ? 'Completed Todos' : 'Active Todos'}
        </Text>
        <ScrollView style={styles.todoList}>
          {filteredTodos.map(todo => (
            <View 
              key={todo.id} 
              style={[
                styles.todoItem, 
                todo.completed && styles.completedTodo
              ]}
            >
              <Text style={styles.todoText}>{todo.text}</Text>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{todo.category}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>About Basic Selectors</Text>
        <Text style={styles.infoText}>
          Reselect provides a way to create memoized selectors that only recompute when their inputs change.
        </Text>
        <Text style={styles.infoText}>
          The examples above use two selectors:
        </Text>
        <Text style={styles.codeText}>getFilteredTodos</Text>
        <Text style={styles.codeText}>getTodoStats</Text>
        <Text style={styles.infoText}>
          These selectors efficiently compute derived data from the Redux store.
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
  statsContainer: {
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4630EB',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  todosContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  todoList: {
    maxHeight: 200,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4630EB',
  },
  completedTodo: {
    borderLeftColor: '#22c55e',
    opacity: 0.7,
  },
  todoText: {
    fontSize: 14,
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 12,
    color: '#333',
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
  codeText: {
    fontFamily: 'monospace',
    backgroundColor: '#e0e0e0',
    padding: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
});

export default BasicSelectors;
