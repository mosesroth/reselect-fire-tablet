# Reselect Test App for Amazon Fire Tablet

This is a React Native application that demonstrates the usage of Reselect for efficient derived data in Redux on an Amazon Fire tablet.

## Screenshot

![Reselect Test App on Amazon Fire Tablet](https://raw.githubusercontent.com/mosesroth/reselect-fire-tablet/main/screenshot.png)

## Features

- Basic selectors for filtering and statistics
- Complex selectors with multiple inputs
- Interactive filter controls
- Error boundaries for improved stability
- Optimized for performance on Fire tablets

## Technologies Used

- React Native
- Expo
- Redux
- Reselect
- React Redux
- Android (for Amazon Fire Tablet compatibility)

## Project Structure

- `app/redux/store.js`: Simplified Redux store configuration
- `app/redux/selectors.js`: Reselect selectors implementation
- `app/components/SimpleTodoList.js`: Todo list with memoized selectors
- `app/components/FilterControls.js`: UI controls for filtering and sorting
- `app/components/ReselectInfo.js`: Information about Reselect
- `app/components/ErrorBoundary.js`: Error handling component

## About Reselect

Reselect is a library for creating memoized, composable selector functions for Redux. Key features:

- Selectors can compute derived data, allowing Redux to store the minimal possible state
- Selectors are efficient - they don't recompute unless their inputs change
- Selectors are composable - they can be used as input to other selectors
- Memoization prevents unnecessary recalculations, improving performance

## License

MIT
