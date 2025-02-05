import {
  Home,
  CreatePost,
  Post,
  EditPost,
  User,
  Login,
  Signup,
  NotFound,
  Verification,
  Verify,
  Posts,
  SendPasswordResetLink,
  ResetPassword,
} from "./pages";

const routes = [
  { path: "", element: <Home />, auth: false },
  { path: "login", element: <Login />, auth: false },
  { path: "signup", element: <Signup />, auth: false },
  {
    path: "send-password-reset-link",
    element: <SendPasswordResetLink />,
    auth: false,
  },
  { path: "reset-password", element: <ResetPassword />, auth: false },
  { path: "verify", element: <Verify />, auth: true },
  { path: "verification", element: <Verification />, auth: true },
  { path: "posts", element: <Posts />, auth: true },
  { path: "create-post", element: <CreatePost />, auth: true },
  { path: "edit-post/:id", element: <EditPost />, auth: true },
  { path: "post/:id", element: <Post />, auth: true },
  { path: "profile/:id", element: <User />, auth: true },
  { path: "*", element: <NotFound />, auth: false },
];

export default routes;
