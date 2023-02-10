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
    document.title = 'Зарегистрироваться';
  }, []);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (Object.entries(toSend).length) {
      if (toSend.password !== toSend.password2) {
        Swal.fire('пароли не совпадают');
      } else {
        await dispatch(signUp(toSend));
        if (error) {
          Swal.fire(error || 'Неправильный логин / пароль');
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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="userName">ФИО</label>
          <input
            type="name"
            className="form-control"
            id="userName"
            name="userName"
            onChange={handleChange}
            value={toSend.userName}
          />
        </div>
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            id="Email"
            name="email"
            onChange={handleChange}
            value={toSend.email}
          />
        </div>
        <div className="mb-3">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="password" className="form-label">Пароль</label>
          <input
            type="new-password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChange}
            value={toSend.password}
          />
        </div>
        <div className="mb-3">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="password2" className="form-label">Пароль еще раз</label>
          <input
            type="new-password"
            className="form-control"
            id="password2"
            name="password2"
            onChange={handleChange}
            value={toSend.password2}
          />
        </div>
        <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default SignUp;
