import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';
import BasicSelectors from './components/BasicSelectors';
import ComplexSelectors from './components/ComplexSelectors';
import SelectorPerformance from './components/SelectorPerformance';

const App = () => {
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  
  // Update filter in Redux store
  const updateFilter = (newFilter) => {
    store.dispatch({ type: 'SET_FILTER', payload: newFilter });
    setFilter(newFilter);
  };
  
  // Update category filter in Redux store
  const updateCategoryFilter = (newCategoryFilter) => {
    store.dispatch({ type: 'SET_CATEGORY_FILTER', payload: newCategoryFilter });
    setCategoryFilter(newCategoryFilter);
  };
  
  // Update sort order in Redux store
  const updateSortOrder = (newSortOrder) => {
    store.dispatch({ type: 'SET_SORT_ORDER', payload: newSortOrder });
    setSortOrder(newSortOrder);
  };
  
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.header}>Reselect Demo</Text>
          <Text style={styles.subheader}>Efficient derived data for Redux</Text>
          
          <View style={styles.filtersContainer}>
            <Text style={styles.filtersTitle}>Filter Controls</Text>
            
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Status Filter:</Text>
              <View style={styles.filterButtons}>
                <TouchableOpacity
                  style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
                  onPress={() => updateFilter('all')}
                >
                  <Text style={[styles.filterButtonText, filter === 'all' && styles.activeFilterText]}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.filterButton, filter === 'active' && styles.activeFilter]}
                  onPress={() => updateFilter('active')}
                >
                  <Text style={[styles.filterButtonText, filter === 'active' && styles.activeFilterText]}>Active</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.filterButton, filter === 'completed' && styles.activeFilter]}
                  onPress={() => updateFilter('completed')}
                >
                  <Text style={[styles.filterButtonText, filter === 'completed' && styles.activeFilterText]}>Completed</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Category Filter:</Text>
              <View style={styles.filterButtons}>
                <TouchableOpacity
                  style={[styles.filterButton, categoryFilter === 'all' && styles.activeFilter]}
                  onPress={() => updateCategoryFilter('all')}
                >
                  <Text style={[styles.filterButtonText, categoryFilter === 'all' && styles.activeFilterText]}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.filterButton, categoryFilter === 'study' && styles.activeFilter]}
                  onPress={() => updateCategoryFilter('study')}
                >
                  <Text style={[styles.filterButtonText, categoryFilter === 'study' && styles.activeFilterText]}>Study</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.filterButton, categoryFilter === 'work' && styles.activeFilter]}
                  onPress={() => updateCategoryFilter('work')}
                >
                  <Text style={[styles.filterButtonText, categoryFilter === 'work' && styles.activeFilterText]}>Work</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.filterButton, categoryFilter === 'health' && styles.activeFilter]}
                  onPress={() => updateCategoryFilter('health')}
                >
                  <Text style={[styles.filterButtonText, categoryFilter === 'health' && styles.activeFilterText]}>Health</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Sort Order:</Text>
              <View style={styles.filterButtons}>
                <TouchableOpacity
                  style={[styles.filterButton, sortOrder === 'asc' && styles.activeFilter]}
                  onPress={() => updateSortOrder('asc')}
                >
                  <Text style={[styles.filterButtonText, sortOrder === 'asc' && styles.activeFilterText]}>A-Z</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.filterButton, sortOrder === 'desc' && styles.activeFilter]}
                  onPress={() => updateSortOrder('desc')}
                >
                  <Text style={[styles.filterButtonText, sortOrder === 'desc' && styles.activeFilterText]}>Z-A</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          <BasicSelectors />
          <ComplexSelectors />
          <SelectorPerformance />
          
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
    padding: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  filtersContainer: {
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
  filtersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  filterSection: {
    marginBottom: 15,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  filterButtons: {
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
  filterButtonText: {
    fontSize: 14,
    color: '#333',
  },
  activeFilterText: {
    color: 'white',
    fontWeight: '500',
  },
  footer: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
});

export default App;
