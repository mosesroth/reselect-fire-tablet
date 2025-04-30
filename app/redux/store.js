import { createStore, combineReducers } from 'redux';

// Initial state for todos
const initialTodosState = {
  todos: [
    { id: 1, text: 'Learn Redux', completed: true, category: 'study' },
    { id: 2, text: 'Learn Reselect', completed: false, category: 'study' },
    { id: 3, text: 'Build a project', completed: false, category: 'work' },
    { id: 4, text: 'Go for a run', completed: true, category: 'health' },
    { id: 5, text: 'Buy groceries', completed: false, category: 'errands' },
  ],
  filter: 'all', // 'all', 'completed', 'active'
  categoryFilter: 'all', // 'all', 'study', 'work', 'health', 'errands'
};

// Initial state for users
const initialUsersState = {
  users: [
    { id: 1, name: 'John Doe', role: 'admin' },
    { id: 2, name: 'Jane Smith', role: 'user' },
    { id: 3, name: 'Bob Johnson', role: 'user' },
  ],
  currentUserId: 1,
};

// Initial state for UI
const initialUiState = {
  theme: 'light',
  loading: false,
  sortOrder: 'asc',
};

// Todos reducer
const todosReducer = (state = initialTodosState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.todos.length + 1,
            text: action.payload.text,
            completed: false,
            category: action.payload.category || 'uncategorized',
          },
        ],
      };
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

// Users reducer
const usersReducer = (state = initialUsersState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUserId: action.payload,
      };
    case 'ADD_USER':
      return {
        ...state,
        users: [
          ...state.users,
          {
            id: state.users.length + 1,
            name: action.payload.name,
            role: action.payload.role || 'user',
          },
        ],
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
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
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
  users: usersReducer,
  ui: uiReducer,
});

// Create store
const store = createStore(rootReducer);

export default store;
