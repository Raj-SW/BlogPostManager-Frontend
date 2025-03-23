// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./Service/statemanagement/store";

// Import your page components
import App from "./App";
import HomePage from "./pages/HomePage";
import DashBoard from "./pages/DashBoard";
import ProfilePage from "./pages/ProfilePage";
import CreateEditBlogPostPage from "./pages/CreateEditBlogPostPage";
import NotFoundPage from "./pages/NotFoundPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      { path: "dashboard", element: <DashBoard /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "createEditBlogPost", element: <CreateEditBlogPostPage /> },
      { path: "unauthorized", element: <UnauthorizedPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
