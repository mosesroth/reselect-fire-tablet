# Reselect Test App for Amazon Fire Tablet

This is a React Native application that demonstrates the usage of Reselect for efficient derived data in Redux on an Amazon Fire tablet.

## Screenshot

![Reselect Test App on Amazon Fire Tablet](https://raw.githubusercontent.com/mosesroth/reselect-fire-tablet/main/screenshot.png)

## Features

- Basic selectors for filtering and statistics
- Complex selectors with multiple inputs
- Performance comparison between memoized and non-memoized selectors
- Interactive filter controls
- Factory selectors demonstration

## Technologies Used

- React Native
- Expo
- Redux
- Reselect
- React Redux
- Android (for Amazon Fire Tablet compatibility)

## Project Structure

- `app/redux/store.js`: Redux store configuration with sample data
- `app/redux/selectors.js`: Reselect selectors implementation
- `app/components/BasicSelectors.js`: Basic usage of selectors
- `app/components/ComplexSelectors.js`: Advanced selector composition
- `app/components/SelectorPerformance.js`: Performance comparison

## About Reselect

Reselect is a library for creating memoized, composable selector functions for Redux. Key features:

- Selectors can compute derived data, allowing Redux to store the minimal possible state
- Selectors are efficient - they don't recompute unless their inputs change
- Selectors are composable - they can be used as input to other selectors
- Memoization prevents unnecessary recalculations, improving performance

## License

MIT
