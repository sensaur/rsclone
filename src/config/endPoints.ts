const { REACT_APP_HOST: host } = process.env;

const signIn = () => `${host}/api/v1/auth/signin`;

export default signIn;
