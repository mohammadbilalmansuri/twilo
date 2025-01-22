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
import { Home, CreatePost, Post, EditPost, User, Login, Signup } from "./pages";
import AuthLayout from "./AuthLayout.jsx";
import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route
        path="login"
        element={
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="signup"
        element={
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        }
      />
      <Route
        path="create-post"
        element={
          <AuthLayout authentication>
            <CreatePost />
          </AuthLayout>
        }
      />
      <Route
        path="edit-post/:slug"
        element={
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        }
      />
      <Route
        path="post/:slug"
        element={
          <AuthLayout authentication>
            <Post />
          </AuthLayout>
        }
      />
      <Route
        path="user/:slug"
        element={
          <AuthLayout authentication>
            <User />
          </AuthLayout>
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
          // <AuthLayout authentication={false}>
          <Login />
          // </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/your-posts",
        element: (
          <AuthLayout authentication>
            <YourPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: (
          <AuthLayout authentication>
            <Post />
          </AuthLayout>
        ),
      },
      {
        path: "/user/:slug",
        element: (
          <AuthLayout authentication>
            <Account />
          </AuthLayout>
        ),
      },
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
