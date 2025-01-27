import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, PostCardUser, Button, Input } from "../components";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import databaseService from "../appwrite/database";
import { updateUser, cleanUsers } from "../store/userSlice";
import { login, logout } from "../store/authSlice";
import { cleanPosts } from "../store/postSlice";

function User() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset: resetForm } = useForm();
  const [error, setError] = useState();
  const allUsers = useSelector((state) => state.user.users);
  const authUser = useSelector((state) => state.auth.userData);
  const posts = useSelector((state) => state.post.posts);
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState(null);

  useEffect(() => {
    const currentUser = allUsers?.find((user) => user.$id === slug);
    if (currentUser) {
      setUser(currentUser);
      setUserPosts(posts?.filter((post) => post.userId === currentUser.$id));
    } else {
      navigate("/");
    }
  }, [slug, allUsers, posts, navigate]);

  const isLoggedUser = user && authUser ? user.$id === authUser.$id : false;

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const paginate = useCallback((pageNumber) => setCurrentPage(pageNumber), []);

  const [isSorted, setIsSorted] = useState(true);
  const sortedPosts = useMemo(() => {
    return isSorted ? userPosts : [...userPosts].reverse();
  }, [userPosts, isSorted]);

  const toggleSort = () => {
    setIsSorted((prevIsSorted) => !prevIsSorted);
    setCurrentPage(1);
  };

  const currentPagePosts = sortedPosts?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  function formatTime(time) {
    const now = new Date();
    const userJoined = new Date(time);

    const diffMilliseconds = now - userJoined;
    const diffSeconds = Math.floor(diffMilliseconds / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else {
      return userJoined.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });
    }
  }

  const logoutHandler = async () => {
    try {
      const status = await authService.logoutUser();
      if (status) {
        dispatch(logout());
        dispatch(cleanPosts());
        dispatch(cleanUsers());
        navigate("/");
      }
    } catch (error) {
      console.log("Unable to logout user :: ", error);
    }
  };

  const [formFor, setFormFor] = useState();
  const [formDisplay, setFormDisplay] = useState("hidden");
  const [buttonsDisplay, setButtonsDisplay] = useState("flex");

  const updateUserName = async (data) => {
    setError("");
    try {
      const userData = await authService.updateName(data.name);
      if (userData) {
        const updatedUserDB = await databaseService.updateUser(userData.$id, {
          name: userData.name,
        });
        dispatch(login(userData));
        updatedUserDB && dispatch(updateUser([userData.$id, updatedUserDB]));
        resetForm();
        setFormDisplay("hidden");
        setButtonsDisplay("flex");
        setFormFor();
      }
    } catch (error) {
      setError(error.message);
      console.log("Unable to update user name :: ", error);
    }
  };

  const updateUserPassword = async (data) => {
    setError("");
    try {
      const status = await authService.updatePassword(
        data.newPassword,
        data.currentPassword
      );
      if (status) {
        resetForm();
        setFormDisplay("hidden");
        setButtonsDisplay("flex");
        setFormFor();
      }
    } catch (error) {
      setError(error.message);
      console.log("Unable to update user password :: ", error);
    }
  };

  return (
    user && (
      <>
        <Helmet>
          <title>{user?.name} - Twilo</title>
        </Helmet>

        <Container className="flex flex-col items-center gap-10">
          <div className="w-full flex justify-between items-center gap-5 bg-gray-800 py-5 px-10 rounded-lg">
            <div className="flex gap-5 items-center">
              <img
                src={`https://cloud.appwrite.io/v1/avatars/initials?name=${user?.name}`}
                alt={user?.name}
                className="rounded-full size-28 aspect-square bg-gray-900 object-cover"
              />
              <div className="text-wrap">
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <h3 className="text-lg text-teal-500">{`@${user?.$id}`}</h3>
                {isLoggedUser && <h3 className="text-lg">{user?.email}</h3>}
              </div>
            </div>

            {isLoggedUser ? (
              <div className="flex flex-col items-end gap-4">
                <div className={`${buttonsDisplay} gap-5 items-center`}>
                  <p>{`Joined ${formatTime(user?.$createdAt)}`}</p>
                  <Button
                    onClick={() => {
                      setFormFor("name");
                      setButtonsDisplay("hidden");
                      setFormDisplay("flex");
                    }}
                  >
                    Update Name
                  </Button>
                  <Button
                    onClick={() => {
                      setFormFor("password");
                      setButtonsDisplay("hidden");
                      setFormDisplay("flex");
                    }}
                  >
                    Update Password
                  </Button>
                  <button
                    onClick={logoutHandler}
                    className="transition-all duration-200 h-10 px-3 rounded-md text-md font-medium bg-red-600 text-gray-100 hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit(
                    formFor === "name" ? updateUserName : updateUserPassword
                  )}
                  className={`${formDisplay} w-full gap-2 items-center bg-gray-800`}
                >
                  {formFor === "name" ? (
                    <div className="w-80">
                      <Input
                        type="text"
                        placeholder="Enter new name"
                        onInput={() => setError("")}
                        {...register("name", {
                          required: true,
                          validate: {
                            matchPatern: (value) =>
                              /^\S(?!.*\s\s)[A-Za-z\s'-]+(?<!\s)\S$/.test(
                                value
                              ) ||
                              "You can not add spaces before and after of the full name.",
                          },
                        })}
                      />
                    </div>
                  ) : (
                    <div className="w-80 flex flex-col gap-2">
                      <Input
                        type="text"
                        placeholder="Enter current password"
                        onInput={() => setError("")}
                        {...register("currentPassword", {
                          required: true,
                        })}
                      />

                      <Input
                        type="text"
                        placeholder="Enter new password"
                        onInput={() => setError("")}
                        {...register("newPassword", {
                          required: true,
                        })}
                      />
                    </div>
                  )}

                  <Button type="submit">
                    {formFor === "name" ? "Update Name" : "Update Password"}
                  </Button>

                  <div
                    onClick={() => {
                      setError("");
                      setFormDisplay("hidden");
                      setButtonsDisplay("flex");
                      setFormFor();
                    }}
                    className="fill-gray-300 p-1 bg-gray-700 rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-600"
                  >
                    <svg
                      width="20"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                  </div>
                </form>

                {error && (
                  <p className="text-red-500 font-medium text-center">
                    {error}
                  </p>
                )}
              </div>
            ) : (
              <p>{`Joined ${formatTime(user?.$createdAt)}`}</p>
            )}
          </div>

          {userPosts.length === 0 ? (
            isLoggedUser ? (
              <div className="flex flex-col justify-center items-center gap-5">
                <h1 className="text-4xl font-bold">
                  Unlocking Your Creative Potential
                </h1>
                <h2 className="text-2xl font-medium">
                  Let's Dive into the World of Writing and Beyond!
                </h2>
                <Link to="/create-post">
                  <Button type="button">Create Post</Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold">{`${user?.name} hasn't created any post!`}</h1>
              </div>
            )
          ) : (
            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{`${user?.name} Posts`}</h1>
                <div className="flex gap-5">
                  {sortedPosts?.length > 1 && (
                    <Button type="button" onClick={toggleSort}>
                      {isSorted ? "See Oldest First" : "See Latest First"}
                    </Button>
                  )}
                  {isLoggedUser && (
                    <Link to="/create-post">
                      <Button type="button">Create New Post</Button>
                    </Link>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-7">
                {currentPagePosts?.map((post) => (
                  <PostCardUser key={post?.$id} {...post} />
                ))}
              </div>

              {sortedPosts?.length > postsPerPage && (
                <div className="flex gap-3 justify-center items-center pt-5">
                  {Array.from(
                    { length: Math.ceil(userPosts.length / postsPerPage) },
                    (_, index) => (
                      <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`h-8 w-8 text-lg leading-[0] rounded-md transition-all duration-200 ${
                          currentPage === index + 1
                            ? "bg-gray-600"
                            : "bg-gray-800 hover:bg-gray-700"
                        }`}
                      >
                        {index + 1}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </Container>
      </>
    )
  );
}

export default User;
