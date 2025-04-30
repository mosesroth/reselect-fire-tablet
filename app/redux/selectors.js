import { createSelector } from 'reselect';

// Basic selectors (input selectors)
export const getTodos = state => state.todos.todos;
export const getFilter = state => state.todos.filter;
export const getCategoryFilter = state => state.todos.categoryFilter;
export const getSortOrder = state => state.ui.sortOrder;

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
