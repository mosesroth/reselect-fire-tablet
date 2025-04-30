import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { 
  getSortedFilteredTodos, 
  getCategoryStats, 
  getCurrentUser 
} from '../redux/selectors';

const ComplexSelectors = () => {
  // Using complex selectors
  const sortedFilteredTodos = useSelector(getSortedFilteredTodos);
  const categoryStats = useSelector(getCategoryStats);
  const currentUser = useSelector(getCurrentUser);
  
  // Get filter and category filter from state
  const filter = useSelector(state => state.todos.filter);
  const categoryFilter = useSelector(state => state.todos.categoryFilter);
  const sortOrder = useSelector(state => state.ui.sortOrder);
  
  // Convert category stats to array for rendering
  const categoryStatsArray = Object.keys(categoryStats).map(category => ({
    name: category,
    ...categoryStats[category]
  }));
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complex Selectors</Text>
      
      <View style={styles.userContainer}>
        <Text style={styles.sectionTitle}>Current User</Text>
        <View style={styles.userCard}>
          <Text style={styles.userName}>{currentUser.name}</Text>
          <View style={[
            styles.roleBadge, 
            currentUser.role === 'admin' ? styles.adminBadge : styles.userBadge
          ]}>
            <Text style={styles.roleText}>{currentUser.role}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.filtersContainer}>
        <Text style={styles.sectionTitle}>Applied Filters</Text>
        <View style={styles.filtersRow}>
          <View style={styles.filterBadge}>
            <Text style={styles.filterText}>Status: {filter}</Text>
          </View>
          <View style={styles.filterBadge}>
            <Text style={styles.filterText}>Category: {categoryFilter}</Text>
          </View>
          <View style={styles.filterBadge}>
            <Text style={styles.filterText}>Sort: {sortOrder}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.todosContainer}>
        <Text style={styles.sectionTitle}>Filtered & Sorted Todos</Text>
        <ScrollView style={styles.todoList}>
          {sortedFilteredTodos.map(todo => (
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
          {sortedFilteredTodos.length === 0 && (
            <Text style={styles.emptyText}>No todos match the current filters</Text>
          )}
        </ScrollView>
      </View>
      
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Category Statistics</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categoryStatsArray.map(category => (
            <View key={category.name} style={styles.categoryStatCard}>
              <Text style={styles.categoryStatName}>{category.name}</Text>
              <Text style={styles.categoryStatValue}>
                {category.completed}/{category.total} completed
              </Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${(category.completed / category.total) * 100}%` }
                  ]} 
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>About Complex Selectors</Text>
        <Text style={styles.infoText}>
          Complex selectors can be composed from simpler ones, creating a chain of transformations.
        </Text>
        <Text style={styles.infoText}>
          The examples above use these complex selectors:
        </Text>
        <Text style={styles.codeText}>getSortedFilteredTodos</Text>
        <Text style={styles.codeText}>getCategoryStats</Text>
        <Text style={styles.codeText}>getCurrentUser</Text>
        <Text style={styles.infoText}>
          These selectors efficiently compute derived data by combining and transforming multiple pieces of state.
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
  userContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  roleBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  adminBadge: {
    backgroundColor: '#fecaca',
  },
  userBadge: {
    backgroundColor: '#bfdbfe',
  },
  roleText: {
    fontSize: 12,
    fontWeight: '500',
  },
  filtersContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterBadge: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  filterText: {
    fontSize: 12,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  todosContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  todoList: {
    maxHeight: 150,
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
  emptyText: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#666',
    padding: 20,
  },
  statsContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  categoryStatCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginRight: 10,
    width: 150,
  },
  categoryStatName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  categoryStatValue: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4630EB',
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

export default ComplexSelectors;
