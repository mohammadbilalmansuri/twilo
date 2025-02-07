import {
  Home,
  CreatePost,
  Post,
  EditPost,
  Profile,
  Login,
  Signup,
  NotFound,
  Verification,
  Verify,
  Posts,
  ForgotPassword,
  ResetPassword,
} from "./pages";

const routes = [
  { path: "", element: <Home />, auth: false },
  { path: "login", element: <Login />, auth: false },
  { path: "signup", element: <Signup />, auth: false },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
    auth: false,
  },
  { path: "reset-password", element: <ResetPassword />, auth: false },
  { path: "verify", element: <Verify />, auth: true },
  { path: "verification", element: <Verification />, auth: true },
  { path: "posts", element: <Posts />, auth: true },
  { path: "create-post", element: <CreatePost />, auth: true },
  { path: "edit-post/:id", element: <EditPost />, auth: true },
  { path: "posts/:id", element: <Post />, auth: true },
  { path: "profile/:id", element: <Profile />, auth: true },
  { path: "*", element: <NotFound />, auth: false },
];

export default routes;
