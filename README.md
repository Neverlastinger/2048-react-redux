## Building and Running the Project

> - Install node.js
> - Run ```npm install``` to download dependencies
> - Run ```npm start``` to load the game on http://localhost:3000/
> - Run ```npm test``` to run tests
> - Run ```npm run build``` to create an optimized build in the build folder and run files locally without a server

## Or Access the Game Directly
[https://neverlastinger.github.io/2048-react-redux/build/](https://neverlastinger.github.io/2048-react-redux/build/)

## About This Repo
This is an implementation of the [2048 game](https://en.wikipedia.org/wiki/2048_(video_game)) written in JavaScript / EcmaScript 6, [React](https://reactjs.org/), and [Redux](https://redux.js.org/), with webpack and babel. The usage of React and Redux is part of the requirements for building this project.

## Technicalities
Infrastructure built with [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app). Manually added Redux and [SASS](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc). The project is not ejected for simplicity.

The Redux implementation is straightforward, with a few deviation from the recommended best practices ([here](https://egghead.io/courses/getting-started-with-redux) and [here](https://egghead.io/courses/building-react-applications-with-idiomatic-redux)). Most of the deviations are for the sake of simplicity - e.g. selectors are not spread across all reducers. I find that using ```fromRandomReducer.selector(...)``` is quite complicated. Instead, all selectors in the application can be found in the **queries.js** file.

The file structure follows a simple separation of **components/**, **containers/**, **store/**, **reducers/**, **config/**, **core/**, and **localStorage/**. Unit tests test only reducer state and thus ensure there are not many bugs related to the state of the application.

The heaviest part of the algorithm can be found in the **gridData** reducer, which maintains two matrixes in order to provide enough data to the view layer to render the game with all the necessary CSS transitions and animations. Referring to the documentation in the source code and understanding how keys work in React will help you better understand the solution implemented here.
