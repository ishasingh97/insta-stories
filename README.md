# Instagram Stories

## Project URL
[https://insta-stories-view.netlify.app/](https://insta-stories-view.netlify.app/)

## Setup
- Node version: v20.11.0
- Installation: `npm i` and you are good to go

## Running the Project
- Start development server: `npm start`
- Run tests in terminal: `npm test`
- Run tests in Cypress interface: `npm run test:open`

## Project Description
This Instagram Stories clone is built with a modern React TypeScript stack, focusing on performance and scalability from the ground up. The application follows a component-based architecture with clear separation of concerns, making it maintainable and extensible.

## Performance Optimizations
1. Images are preloaded using the browser's native Image API before displaying them to users, preventing jarring transitions when navigating between stories.

2. All intervals and timeouts are properly cleared using useRef to track them and useEffect cleanup functions to ensure they're removed when components unmount.

3. Event handlers like handleNext, handlePrev, and safeClose are memoized using useCallback to prevent unnecessary re-renders.

## Scalability Considerations
1. The core components are designed to be stateless, receiving data through props, which makes it easier to integrate with state management libraries like Redux if needed.

2. Components are organized by feature (storyList, storyViewer) rather than by type, making it easier to add new features without modifying existing code.

3. Business logic is extracted into custom hooks like useFetchStories, making it reusable and testable in isolation.

## Build and Deployment Optimization
1. The build process is set up to support code splitting, allowing for smaller initial bundle sizes and faster load times.

2. Static assets are processed and optimized during the build process, reducing load times for users.

3. The development environment uses hot module replacement for a faster development experience without losing application state.