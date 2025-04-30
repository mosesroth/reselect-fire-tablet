import { createStore, combineReducers } from 'redux';

// Simplified initial state for todos
const initialTodosState = {
  todos: [
    { id: 1, text: 'Learn Redux', completed: true, category: 'study' },
    { id: 2, text: 'Learn Reselect', completed: false, category: 'study' },
    { id: 3, text: 'Build a project', completed: false, category: 'work' },
    { id: 4, text: 'Go for a run', completed: true, category: 'health' },
  ],
  filter: 'all', // 'all', 'completed', 'active'
  categoryFilter: 'all', // 'all', 'study', 'work', 'health'
};

// Simplified initial state for UI
const initialUiState = {
  theme: 'light',
  sortOrder: 'asc',
};

// Todos reducer
const todosReducer = (state = initialTodosState, action) => {
  switch (action.type) {
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    case 'SET_CATEGORY_FILTER':
      return {
        ...state,
        categoryFilter: action.payload,
      };
    default:
      return state;
  }
};

// UI reducer
const uiReducer = (state = initialUiState, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    case 'SET_SORT_ORDER':
      return {
        ...state,
        sortOrder: action.payload,
      };
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  todos: todosReducer,
  ui: uiReducer,
});

// Create store
const store = createStore(rootReducer);

export default store;
