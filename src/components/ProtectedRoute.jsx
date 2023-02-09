import {
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.userSlice);
  if (user?.user === null || !user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
