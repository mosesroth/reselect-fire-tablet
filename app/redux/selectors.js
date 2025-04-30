import { createSelector } from 'reselect';

// Basic selectors (input selectors)
export const getTodos = state => state.todos.todos;
export const getFilter = state => state.todos.filter;
export const getCategoryFilter = state => state.todos.categoryFilter;
export const getUsers = state => state.users.users;
export const getCurrentUserId = state => state.users.currentUserId;
export const getTheme = state => state.ui.theme;
export const getLoading = state => state.ui.loading;
export const getSortOrder = state => state.ui.sortOrder;

// Memoized selectors using reselect

// Get filtered todos based on completion status
export const getFilteredTodos = createSelector(
  [getTodos, getFilter],
  (todos, filter) => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }
);

// Get todos filtered by both completion status and category
export const getFilteredTodosByCategory = createSelector(
  [getFilteredTodos, getCategoryFilter],
  (filteredTodos, categoryFilter) => {
    if (categoryFilter === 'all') {
      return filteredTodos;
    }
    return filteredTodos.filter(todo => todo.category === categoryFilter);
  }
);

// Get sorted todos based on sort order
export const getSortedFilteredTodos = createSelector(
  [getFilteredTodosByCategory, getSortOrder],
  (filteredTodos, sortOrder) => {
    const sortedTodos = [...filteredTodos];
    return sortedTodos.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.text.localeCompare(b.text);
      } else {
        return b.text.localeCompare(a.text);
      }
    });
  }
);

// Get todo statistics
export const getTodoStats = createSelector(
  [getTodos],
  (todos) => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    const percentCompleted = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return {
      total,
      completed,
      active,
      percentCompleted
    };
  }
);

// Get category statistics
export const getCategoryStats = createSelector(
  [getTodos],
  (todos) => {
    const categories = {};
    
    todos.forEach(todo => {
      if (!categories[todo.category]) {
        categories[todo.category] = {
          total: 0,
          completed: 0
        };
      }
      
      categories[todo.category].total += 1;
      if (todo.completed) {
        categories[todo.category].completed += 1;
      }
    });
    
    return categories;
  }
);

// Get current user
export const getCurrentUser = createSelector(
  [getUsers, getCurrentUserId],
  (users, currentUserId) => {
    return users.find(user => user.id === currentUserId) || null;
  }
);

// Get admin users
export const getAdminUsers = createSelector(
  [getUsers],
  (users) => {
    return users.filter(user => user.role === 'admin');
  }
);

// Get regular users
export const getRegularUsers = createSelector(
  [getUsers],
  (users) => {
    return users.filter(user => user.role === 'user');
  }
);

// Complex selector that combines multiple pieces of state
export const getAppSummary = createSelector(
  [getTodoStats, getCurrentUser, getTheme],
  (todoStats, currentUser, theme) => {
    return {
      todoStats,
      currentUser,
      theme
    };
  }
);
