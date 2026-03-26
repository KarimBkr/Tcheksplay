import { RouterProvider } from '@tanstack/react-router';
import { AuthProvider } from '@/features/auth/AuthContext';
import { router } from '@/app/router';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
