import React from 'react';

type Tprops = {
  children: React.ReactNode;
};

function BoardHeader(props: Tprops) {
  const { children } = props;
  return (
    <div className="flex justify-between items-center py-3">
      <h1 className="text-3xl">Your boards</h1>
      {children}
    </div>
  );
}

export default BoardHeader;
