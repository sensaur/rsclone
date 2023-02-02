const initState = {
  user: null,
};

const getInitState = () => {
  // @ts-ignore
  const stateFromLS = JSON.parse(window.localStorage.getItem('redux'));
  return stateFromLS || initState;
};

export default getInitState;
