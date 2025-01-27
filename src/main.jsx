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
import {
  Home,
  CreatePost,
  Post,
  EditPost,
  User,
  Login,
  Signup,
  NotFound,
  VerifyEmail,
  EmailSent,
  Posts,
  ResetPassword,
} from "./pages";
import Protect from "./Protect.jsx";
import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path=""
        element={
          <Protect authentication={false}>
            <Home />
          </Protect>
        }
      />
      <Route
        path="posts"
        element={
          <Protect>
            <Posts />
          </Protect>
        }
      />
      <Route
        path="login"
        element={
          <Protect authentication={false}>
            <Login />
          </Protect>
        }
      />
      <Route
        path="signup"
        element={
          <Protect authentication={false}>
            <Signup />
          </Protect>
        }
      />
      <Route
        path="verify"
        element={
          <Protect>
            <EmailSent />
          </Protect>
        }
      />
      <Route
        path="verify-email"
        element={
          <Protect>
            <VerifyEmail />
          </Protect>
        }
      />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route
        path="create-post"
        element={
          <Protect>
            <CreatePost />
          </Protect>
        }
      />
      <Route
        path="edit-post/:id"
        element={
          <Protect>
            <EditPost />
          </Protect>
        }
      />
      <Route
        path="post/:id"
        element={
          <Protect>
            <Post />
          </Protect>
        }
      />
      <Route
        path="user/:id"
        element={
          <Protect>
            <User />
          </Protect>
        }
      />
      <Route
        path="*"
        element={
          <Protect authentication={false}>
            <NotFound />
          </Protect>
        }
      />
    </Route>
  )
);

/* // another approach
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          // <Protect authentication={false}>
          <Login />
          // </Protect>
        ),
      },
      // so on...
    ],
  },
]);
*/

const helmetContext = {
  helmet: {},
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider context={helmetContext}>
        <RouterProvider router={router} />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
