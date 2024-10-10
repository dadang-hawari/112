import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './pages/Login';
import Home from './pages/Home';
import Report from './pages/Report';

export default function Route() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <App />,
    },
    {
      path: '/report',
      element: <Report />,
    },
  ]);

  return (
    <>
      {' '}
      <RouterProvider router={router} />
    </>
  );
}
