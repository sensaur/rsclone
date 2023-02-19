import {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { signIn } from '../redux/ac/user.ac';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

function SignIn() {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.userSlice);

  const navigate = useNavigate();
  const initialState = {
    email: '',
    password: '',
  };
  const [toSend, setToSend] = useState(initialState);
  useEffect(() => {
    document.title = 'Sign in';
    // eslint-disable-next-line
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (Object.entries(toSend).length) {
      await dispatch(signIn(toSend));
      if (error) {
        Swal.fire(error || 'Wrong login / password');
      } else {
        navigate('/boards');
      }
    }
  };

  return (
    <div className="w-1/2 py-4 m-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-colorD1" onSubmit={handleSubmit}>
        <div className="mb-4">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-colorD3" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-colorD2 dark:text-colorD3"
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            autoComplete="email"
            onChange={handleChange}
            value={toSend.email}
          />
        </div>
        <div className="mb-6">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-colorD3" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-colorD2 dark:text-colorD3"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="******************"
            onChange={handleChange}
            value={toSend.password}
          />
          <p className="text-red-500 text-xs italic">Please enter a password.</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="btn btn-primary"
            type="submit"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 dark:text-colorD4 dark:hover:text-blue-800"
            href="/"
          >
            Forgot Password?
          </a>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs dark:text-colorD3">
        &copy;2023 RS School. All rights reserved.
      </p>
    </div>
  );
}

export default SignIn;
