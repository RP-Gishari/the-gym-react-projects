import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import BoardPage from "../pages/BoardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <BoardPage /> },
      { path: "member", element: <BoardPage />},
      { path: "member/:id", element: <BoardPage /> },
    ],
  },
]);

export default router