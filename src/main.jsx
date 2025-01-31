import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
import { HelmetProvider } from "react-helmet-async";
import Protect from "./Protect.jsx";
import routes from "./routes.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {routes.map(({ path, element, auth }) => (
        <Route
          key={path}
          path={path}
          element={<Protect authentication={auth}>{element}</Protect>}
        />
      ))}
    </Route>
  )
);

const helmetContext = {};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider context={{ helmetContext }}>
        <RouterProvider router={router} />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
