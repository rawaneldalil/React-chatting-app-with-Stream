import { createBrowserRouter, Outlet } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { Home } from "./pages/Home"
import { AuthLayout } from "./pages/layouts/AuthLayout"
import { RootLayout } from "./pages/layouts/RootLayout"
import { LogIn } from "./pages/LogIn"
import { SignUp } from "./pages/SignUp"
import { NewChannel } from "./pages/channel/new"

export const router = createBrowserRouter([
  {
    element: <ContextWrapper />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          { index: true, element: <Home /> },
          {
            path: "/channel",
            children: [{ path: "new", element: <NewChannel /> }],
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: "login", element: <LogIn /> },
          { path: "signup", element: <SignUp /> },
        ],
      },
    ],
  },
])

function ContextWrapper() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}