import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

const defineRoutes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Dashboard />,
      },
      {
        path: "/forbidden",
        element: <Error errorCode="401" />,
      },
      {
        path: "/error",
        element: <Error errorCode="404" />,
      },
      {
        path: "*",
        element: <Navigate to="/error" replace />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={defineRoutes} />;
}

export default Router;
