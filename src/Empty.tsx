import { useEffect } from 'react';

function Empty() {
  useEffect(() => {
    document.title = 'RS Clone';
  }, []);
  return (
    <div className="container">
      <h1>Трелло клон</h1>
    </div>
  );
}

export default Empty;
