import {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { signUp } from '../redux/ac/user.ac';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

function SignUp() {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.userSlice);
  const initialState = {
    userName: '',
    email: '',
    password: '',
    password2: '',
  };
  const [toSend, setToSend] = useState(initialState);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Sign Up';
  }, []);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (Object.entries(toSend).length) {
      if (toSend.password !== toSend.password2) {
        await Swal.fire('Passwords are not equal');
      } else {
        await dispatch(signUp(toSend));
        if (error) {
          await Swal.fire(error || 'Wrong login / password');
        } else {
          // Swal.fire('Пользователь создан');
          navigate('/login');
        }
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToSend({
      ...toSend,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-1/2 py-4 m-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
            User name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="userName"
            name="userName"
            type="text"
            placeholder="Name"
            autoComplete="userName"
            onChange={handleChange}
            value={toSend.userName}
          />
        </div>
        <div className="mb-4">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="******************"
            autoComplete="new-password"
            onChange={handleChange}
            value={toSend.password}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password2">
            Password one more time
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password2"
            name="password2"
            type="password"
            placeholder="******************"
            autoComplete="new-password"
            onChange={handleChange}
            value={toSend.password2}
          />
          <p className="text-red-500 text-xs italic">Please enter a password.</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="btn btn-primary"
            type="submit"
          >
            Sign Up
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/"
          >
            Forgot Password?
          </a>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2023 RS School. All rights reserved.
      </p>
    </div>
  );
}

export default SignUp;
