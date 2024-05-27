import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import SingleGif from "./pages/SingleGif";
import Category from "./pages/Category";
import Search from "./pages/Search";
import Favourites from "./pages/Favourites";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,

      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/:type/:slug",
          element: <SingleGif />,
        },
        {
          path: "/:category",
          element: <Category />,
        },
        {
          path: "/search/:query",
          element: <Search />,
        },
        {
          path: "/favorites",
          element: <Favourites />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
