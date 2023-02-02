import Swal from 'sweetalert2';
import * as endPoints from '../../config/endPoints';
import { setUserSlice } from '../slices/userSlice';

// eslint-disable-next-line import/prefer-default-export,consistent-return
export const signIn = (payload: any, navigate: any) => async (dispatch: any) => {
  console.log('222', endPoints.signIn());
  const response = await fetch(endPoints.signIn(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  if (response.status === 200) {
    const user = await response.json();
    dispatch(setUserSlice(user));
    // if (user.role === 'admin') {
    //   return navigate('/claims');
    // }
    // if (user.role === 'manager') {
    //   return navigate('/claimsManager');
    // }
    // if (user.role === 'client') {
    //   return navigate('/claimsClient');
    // }
    return navigate('/');
  }
  Swal.fire('Неправильный логин / пароль');
};
