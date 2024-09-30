import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './pages/Login';
import Home from './pages/Home';

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
  ]);

  return (
    <>
      {' '}
      <RouterProvider router={router} />
    </>
  );
}
