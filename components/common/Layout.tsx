import React, { ReactNode } from 'react';
import Header from '../Header';
import styles from './Layout.module.css';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>판다마켓</title>
      </Head>
      <Header />
      <div className={styles.container}>
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
