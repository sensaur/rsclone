const { REACT_APP_HOST: host } = process.env;

const signIn = () => `${host}/api/v1/auth/signin`;

const signUp = () => `${host}/api/v1/auth/signup`;

export { signIn, signUp };
