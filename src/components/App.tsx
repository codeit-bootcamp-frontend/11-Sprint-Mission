import React, { ReactNode } from 'react';
import '../utils/Style.css';
import './Nav.css';

interface Prop {
  children?: ReactNode;
}

function App({ children }: Prop) {
  return <div>{children}</div>;
}

export default App;
