import { useEffect } from 'react';

function Empty() {
  useEffect(() => {
    document.title = 'RS Clone';
  }, []);
  return (
    <>
      <h1>Трелло клон</h1>
      <h2>111</h2>
    </>
  );
}

export default Empty;
