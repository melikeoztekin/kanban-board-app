import "./App.css";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Container } from "react-bootstrap";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BoardsPage from "./pages/BoardsPage";
import ListsPage from "./pages/ListsPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const handleLogin = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };
  useEffect(() => {
    let localToken = localStorage.getItem("token");
    if (localToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    return () => {};
  }, []);

  const handleLogout = () => {
    setToken("");
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage onSuccess={handleLogin} />,
    },
    {
      path: "/login",
      element: <LoginPage onSuccess={handleLogin} />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);
  const routerLoggedIn = createBrowserRouter([
    {
      path: "/boards",
      element: <BoardsPage onLogout={handleLogout} />,
    },
    {
      path: "/lists/:id",
      element: <ListsPage onLogout={handleLogout} />,
    },
  ]);
  return (
    <>
      <div className="vh-100">
        <ToastContainer autoClose={2000} />
        {!isLoggedIn ? (
          <Container fluid>
            <RouterProvider router={router} />
          </Container>
        ) : (
          <RouterProvider router={routerLoggedIn} />
        )}
      </div>
    </>
  );
};

export default App;
