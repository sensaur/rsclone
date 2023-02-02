const { REACT_APP_HOST: host } = process.env;

export function signIn() {
  return `${host}/api/v1/auth/signin`;
}

export default signIn;
