import { Link, NavLink } from "react-router-dom";
import { Loader } from ".";
import { useAuthState, useLogout } from "../hooks";
import cn from "../utils/cn";

const Header = () => {
  const { isLoggedIn, isVerified, user } = useAuthState();
  const { logout, loggingOut } = useLogout();

  return (
    <header className="w-full fixed top-0 z-40 flex flex-col items-center lg:px-4 px-3">
      <div className="max-w relative p-3 flex justify-between items-center border-1.5 border-t-0 border-black/10 bg-white rounded-b-lg">
        {isLoggedIn ? (
          isVerified ? (
            <Link to="/feed" className="logo">
              twilo
            </Link>
          ) : (
            <span className="logo cursor-default">twilo</span>
          )
        ) : (
          <Link to="/" className="logo">
            twilo
          </Link>
        )}

        <nav className="flex items-center sm:gap-4 gap-3">
          {isLoggedIn ? (
            <>
              {isVerified && (
                <>
                  <NavLink
                    to="/feed"
                    className={({ isActive }) =>
                      cn(
                        "icon-black",
                        isActive && "pointer-events-none fill-blue"
                      )
                    }
                  >
                    <svg viewBox="0 0 576 512" className="icon-svg">
                      <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                    </svg>
                  </NavLink>

                  <NavLink
                    to="/create"
                    className={({ isActive }) =>
                      cn(
                        "icon-black",
                        isActive && "pointer-events-none fill-blue"
                      )
                    }
                  >
                    <svg viewBox="0 0 448 512" className="icon-svg">
                      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                    </svg>
                  </NavLink>
                </>
              )}

              <button
                className="icon-black"
                onClick={logout}
                disabled={loggingOut}
              >
                {loggingOut ? (
                  <Loader size="xs" color="blue" />
                ) : (
                  <svg viewBox="0 0 512 512" className="icon-svg">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                  </svg>
                )}
              </button>

              {isVerified && (
                <NavLink
                  to={`/profile/${user?.$id}`}
                  className={({ isActive }) =>
                    cn(
                      "icon-black font-zen-dots",
                      isActive && "pointer-events-none text-blue"
                    )
                  }
                >
                  {user?.name ? (
                    user.name[0].toUpperCase()
                  ) : (
                    <Loader size="xs" color="white" />
                  )}
                </NavLink>
              )}
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  cn("icon-black", isActive && "pointer-events-none fill-blue")
                }
              >
                <svg viewBox="0 0 512 512" className="icon-svg rotate-180">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                </svg>
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  cn("icon-black", isActive && "pointer-events-none fill-blue")
                }
              >
                <svg viewBox="0 0 640 512" className="sm:size-4.5 size-4">
                  <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM504 312l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                </svg>
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
