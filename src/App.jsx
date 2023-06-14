import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { checkAuthLoader, tokenLoader } from "./utils/auth";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import GroupsPage, { groupsLoader } from "./pages/Groups";
import UsersPage, { usersLoader } from "./pages/Users";
import { loader as logoutLoader } from "./pages/Logout";
import GroupForm, { createGroup, updateGroup } from "./components/GroupForm";
import UserForm, { createUser, updateUser, userGroupLoader } from "./components/UserForm";
import GroupDetail, { groupDetailLoader } from "./components/GroupDetail";
import UserDetail, { userDetailLoader } from "./components/UserDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: tokenLoader,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: "groups",
        element: <GroupsPage />,
        id: "groupsPage",
        loader: groupsLoader,
        children: [
          {
            path: "",
            loader: checkAuthLoader,
            element: <Outlet></Outlet>,
            children: [
              {
                path: "newGroup",
                element: <GroupForm />,
                action: createGroup,
              },
              {
                path: ":id",
                id: "groupDetail",
                loader: groupDetailLoader,
                children: [
                  {
                    index: true,
                    element: <GroupDetail />,
                  },
                  {
                    path: "edit",
                    element: <GroupForm />,
                    action: updateGroup,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "users",
        element: <UsersPage />,
        loader: usersLoader,
        children: [
          {
            path: "",
            loader: checkAuthLoader,
            element: <Outlet></Outlet>,
            children: [
              {
                path: "newUser",
                element: <UserForm />,
                action: createUser,
                loader: userGroupLoader
              },
              {
                path: ":id",
                id: "userDetail",
                loader: userDetailLoader,
                children: [
                  {
                    index: true,
                    element: <UserDetail />,
                  },
                  {
                    path: "edit",
                    element: <UserForm />,
                    loader: userGroupLoader,
                    action: updateUser,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "logout",
        loader: logoutLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
