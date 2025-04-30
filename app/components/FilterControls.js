import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const FilterControls = () => {
  const dispatch = useDispatch();
  
  // Get current filters from state
  const filter = useSelector(state => state.todos.filter);
  const categoryFilter = useSelector(state => state.todos.categoryFilter);
  const sortOrder = useSelector(state => state.ui.sortOrder);
  
  // Update filter in Redux store
  const updateFilter = (newFilter) => {
    dispatch({ type: 'SET_FILTER', payload: newFilter });
  };
  
  // Update category filter in Redux store
  const updateCategoryFilter = (newCategoryFilter) => {
    dispatch({ type: 'SET_CATEGORY_FILTER', payload: newCategoryFilter });
  };
  
  // Update sort order in Redux store
  const updateSortOrder = (newSortOrder) => {
    dispatch({ type: 'SET_SORT_ORDER', payload: newSortOrder });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Controls</Text>
      
      <View style={styles.filterSection}>
        <Text style={styles.sectionTitle}>Status Filter:</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
            onPress={() => updateFilter('all')}
          >
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'active' && styles.activeFilter]}
            onPress={() => updateFilter('active')}
          >
            <Text style={styles.buttonText}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'completed' && styles.activeFilter]}
            onPress={() => updateFilter('completed')}
          >
            <Text style={styles.buttonText}>Completed</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.filterSection}>
        <Text style={styles.sectionTitle}>Category Filter:</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.filterButton, categoryFilter === 'all' && styles.activeFilter]}
            onPress={() => updateCategoryFilter('all')}
          >
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, categoryFilter === 'study' && styles.activeFilter]}
            onPress={() => updateCategoryFilter('study')}
          >
            <Text style={styles.buttonText}>Study</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, categoryFilter === 'work' && styles.activeFilter]}
            onPress={() => updateCategoryFilter('work')}
          >
            <Text style={styles.buttonText}>Work</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, categoryFilter === 'health' && styles.activeFilter]}
            onPress={() => updateCategoryFilter('health')}
          >
            <Text style={styles.buttonText}>Health</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.filterSection}>
        <Text style={styles.sectionTitle}>Sort Order:</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.filterButton, sortOrder === 'asc' && styles.activeFilter]}
            onPress={() => updateSortOrder('asc')}
          >
            <Text style={styles.buttonText}>A-Z</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, sortOrder === 'desc' && styles.activeFilter]}
            onPress={() => updateSortOrder('desc')}
          >
            <Text style={styles.buttonText}>Z-A</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          These controls update the Redux store, which triggers reselect selectors to recalculate only when necessary.
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
  filterSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  activeFilter: {
    backgroundColor: '#4630EB',
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
  infoBox: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 6,
    marginTop: 5,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
  },
});

export default FilterControls;
