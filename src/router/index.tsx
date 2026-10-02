import { lazy, Suspense } from "react";
import { createHashRouter, Navigate } from "react-router-dom";
import ErrorBoundary from '../components/ErrorBoundary'

const Login = lazy(() => import("../pages/Login.tsx"));
const Registro = lazy(() => import("../pages/Registro.tsx"));
const Dashboard = lazy(() => import("../pages/Dashboard.tsx"));
const Inicio = lazy(() => import("../pages/Inicio.tsx"));
const PrivateRoute = lazy(() => import("../components/PrivateRoute.tsx"));
const Actividades = lazy(() => import("../components/Actividades.tsx"));
const Confirmacion = lazy(() => import("../components/Confirmacion.tsx"));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="flex items-center justify-center h-screen text-white">Cargando...</div>}>
    {children}
  </Suspense>
);


const router = createHashRouter([
  {
    path: "/",
    element: <Navigate to="/inicio" replace />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/inicio",
    element: <SuspenseWrapper><Inicio /></SuspenseWrapper>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/registro",
    element: <SuspenseWrapper><Registro /></SuspenseWrapper>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/registro/actividades",
    element: <SuspenseWrapper><Actividades /></SuspenseWrapper>,
    errorElement: <ErrorBoundary />,

  },
  {
    path: "/registro/confirmacion",
    element: <SuspenseWrapper><Confirmacion /></SuspenseWrapper>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/auth-login",
    element: <SuspenseWrapper><Login /></SuspenseWrapper>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard",
    element: (
      <SuspenseWrapper>
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      </SuspenseWrapper>
    ),
    errorElement: <ErrorBoundary />,
  },
]);

export default router;