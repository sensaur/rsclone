import {
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
// @ts-ignore
// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  // @ts-ignore
  const { user } = useSelector((state) => state.userSlice);
  if (user?.userName === null || !user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
