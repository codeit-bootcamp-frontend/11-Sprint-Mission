import React, { HTMLProps } from 'react';
import styles from './Container.module.css';

interface ContainerProps extends HTMLProps<HTMLDivElement> {
  className?: string;
  page?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  className = '',
  page,
  ...props
}) => {
  const classNames = `${styles.container} ${
    page ? styles.page : ''
  } ${className}`;
  return <div className={classNames} {...props} />;
};

export default Container;
