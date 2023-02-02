import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { signIn } from '../src/redux/ac/user.ac';

function SignIn() {
  // const loader = useSelector((state) => state.loader);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const initialState = {
    email: '',
    password: '',
  };
  const [toSend, setToSend] = useState(initialState);
  useEffect(() => {
    document.title = 'Войти';
    // eslint-disable-next-line
  }, []);

  const handleChange = (e: any) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let payload = Object.entries(toSend).filter((el) => (el[1] ? el[1].trim() : el[1]));
    if (payload.length) {
      // @ts-ignore
      payload = Object.fromEntries(payload);
      console.log(payload);
      // dispatch(signIn(payload, navigate));
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
        />
      </div>
      <button type="submit" className="btn btn-primary">Войти</button>
    </form>
  );
}

export default SignIn;
