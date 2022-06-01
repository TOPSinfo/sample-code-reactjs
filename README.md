sample react project
-------------


# Project Structure
- `public/`
    - Static assets of site
- `css/`
    - Bootstrap and global stylesheets
- `src/pages`
    - Each subfolder must contain all the information, including the test files for the given page
        - `pages/Login`
        - `pages/Dashboard`
- `App.js`
    - App Component
- `index.tsx`
    - Entry point
- `route.js`
    - Routes should only be defined in the `route.js` or else that is used to manage the routes in the project or dynamically managed


--------------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:8081](http://localhost:8081) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Important libraries

### React Redux
React Redux version 7.2 is installed in the project [more information](https://react-redux.js.org)

### React Router
Training React Router version 5.2 is installed in the prokect [more information](https://github.com/ReactTraining/react-router)

#### React Router tutorials
In addition to the official documentation here are some tutorials
[react router v5 - SitePoint](https://www.sitepoint.com/react-router-complete-guide/)
[react router v5 - freeCodeCamp](https://www.freecodecamp.org/news/react-router-in-5-minutes/)
[Redux + React Router](https://redux.js.org/advanced/usage-with-react-router)

**WARNING** THE `react-router-redux` PACKAGE IS NOW DEPRECATED. PLEASE REFER TO [Redux Integration](https://reacttraining.com/react-router/web/guides/redux-integration) TO INTEGRATE WITH REDUX

### React Bootstrap
Boostrap Styled v4 is installed in the project [more information](https://github.com/bootstrap-styled/v4)

### React Jitsi
To simplify Jitsi integration we are using react-jitsi. [More information](https://github.com/gatteo/react-jitsi#readme)

### `.env` File
Refer to the `.env.example` file for the list of the parameters used in the project.

* Make sure to have a working Firebase environment set up for testing
* Make sure to not propagate this file to our repo
* accepted values are `.env` for production, `.env.development`, `.env.development.local` for development and local development and test.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
