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
    document.title = 'Войти';
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
        Swal.fire(error || 'Неправильный логин / пароль');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="mb-3">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          name="email"
          onChange={handleChange}
          value={toSend.email}
          aria-describedby="emailHelp"
          placeholder={toSend.email}
          autoComplete="email"
        />
      </div>
      <div className="mb-3">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          name="password"
          onChange={handleChange}
          value={toSend.password}
          autoComplete="password"
        />
      </div>
      <button type="submit" className="btn btn-primary">Войти</button>
    </form>
  );
}

export default SignIn;
