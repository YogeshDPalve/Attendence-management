import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import LoginForm from "./pages/Auth";
import MainLayout from "./layout/MainLayout";
import { ThemeProvider } from "@/components/theme-provider";
import HeroSection from "./pages/HeroSection";
import UserDashboard from "./pages/user/UserDashboard";
import Analytics from "./pages/user/Analytics";
import LeavePage from "./pages/user/LeavePage";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            {/* <Courses />  */}
          </>
        ),
      },
      {
        path: "login",
        element: (
          // <AuthenticatedUser>
          <LoginForm />
          // </AuthenticatedUser>
        ),
      },
      {
        path: "dashboard",
        element: (
          // <ProtectedRoutes>
          <UserDashboard />
          // </ProtectedRoutes>
        ),
      },
      {
        path: "analytics",
        element: (
          // <ProtectedRoutes>
          <Analytics />
          // </ProtectedRoutes>
        ),
      },
      {
        path: "leave",
        element: (
          // <ProtectedRoutes>
          <LeavePage />
          // </ProtectedRoutes>
        ),
      },
      // {
      //   path: "course-detail/:courseId",
      //   element: (
      //     <ProtectedRoutes>
      //       <CourseDetail />
      //     </ProtectedRoutes>
      //   ),
      // },
      // {
      //   path: "course-progress/:courseId",
      //   element: (
      //     <ProtectedRoutes>
      //       <PurchasedCourseProtectedRoutes>
      //         <CourseProgress />
      //       </PurchasedCourseProtectedRoutes>
      //     </ProtectedRoutes>
      //   ),
      // },

      //* Admin Routes strar from here

      // {
      //   path: "admin",
      //   element: (
      //     <AdminRoute>
      //       <Sidebar />
      //     </AdminRoute>
      //   ),
      //   children: [
      //     {
      //       path: "dashboard",
      //       element: <Dashboard />,
      //     },
      //     {
      //       path: "course",
      //       element: <CourseTable />,
      //     },
      //     {
      //       path: "course/create",
      //       element: <AddCourse />,
      //     },
      //     {
      //       path: "course/:courseId",
      //       element: <EditCourse />,
      //     },
      //     {
      //       path: "course/:courseId/lecture",
      //       element: <CreateLecture />,
      //     },
      //     {
      //       path: "course/:courseId/lecture/:lectureId",
      //       element: <EditLecture />,
      //     },
      //   ],
      // },
    ],
  },
]);
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  );
}

export default App;
