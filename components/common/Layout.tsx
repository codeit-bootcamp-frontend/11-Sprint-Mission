import React, { ReactNode } from 'react';
import Header from '../Header';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className={styles.container}>
        <Header />
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
