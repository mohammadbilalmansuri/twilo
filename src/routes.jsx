import {
  Home,
  Login,
  Signup,
  ForgotPassword,
  ResetPassword,
  Verify,
  Verification,
  Feed,
  CreatePost,
  EditPost,
  Post,
  Profile,
  NotFound,
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
  { path: "feed", element: <Feed />, auth: true },
  { path: "create", element: <CreatePost />, auth: true },
  { path: "edit/:id", element: <EditPost />, auth: true },
  { path: "post/:id", element: <Post />, auth: true },
  { path: "profile/:id", element: <Profile />, auth: true },
  { path: "*", element: <NotFound />, auth: false },
];

export default routes;
