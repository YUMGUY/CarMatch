import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Result from "./pages/Result";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "results",
      element: <Results />,
    },
    {
      path: "result",
      element: <Result />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
