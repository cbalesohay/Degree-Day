/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
// import { createRoot } from 'react-dom/client'
import {name as appName} from './app.json';
// import configureStore from './configureStore'
// import store from './app/store'
// import { Provider } from 'react-redux'

AppRegistry.registerComponent(appName, () => App);

// const root = createRoot(document.getElementById('root')!)

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
// )