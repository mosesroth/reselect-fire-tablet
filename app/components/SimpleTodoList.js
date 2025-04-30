import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getSortedFilteredTodos, getTodoStats } from '../redux/selectors';

const SimpleTodoList = () => {
  const dispatch = useDispatch();
  
  // Use memoized selectors
  const todos = useSelector(getSortedFilteredTodos);
  const stats = useSelector(getTodoStats);
  
  // Get current filters for display
  const filter = useSelector(state => state.todos.filter);
  const categoryFilter = useSelector(state => state.todos.categoryFilter);
  
  // Toggle todo completion status
  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };
  
  // Render a single todo item
  const renderTodoItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.todoItem, item.completed && styles.completedTodo]} 
      onPress={() => toggleTodo(item.id)}
    >
      <View style={styles.todoContent}>
        <Text style={[styles.todoText, item.completed && styles.completedText]}>
          {item.text}
        </Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List with Reselect</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.completed}</Text>
          <Text style={styles.statLabel}>Done</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.active}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
      </View>
      
      <View style={styles.filtersContainer}>
        <Text style={styles.filterLabel}>
          Showing: {filter} {categoryFilter !== 'all' ? `in ${categoryFilter}` : ''}
        </Text>
      </View>
      
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No todos match the current filters</Text>
        }
      />
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Tap on a todo to toggle its completion status
        </Text>
        <Text style={styles.infoText}>
          The list is filtered and sorted using Reselect selectors
        </Text>
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4630EB',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  filtersContainer: {
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
  },
  list: {
    maxHeight: 250,
  },
  todoItem: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#4630EB',
  },
  completedTodo: {
    borderLeftColor: '#22c55e',
    opacity: 0.7,
  },
  todoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoText: {
    fontSize: 16,
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  categoryBadge: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 12,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#666',
    padding: 20,
  },
  infoContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
});

export default SimpleTodoList;
