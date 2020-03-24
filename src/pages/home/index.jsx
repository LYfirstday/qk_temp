import React from 'react';
import styles from './../../index.less';

const Home = ({ history }) => {

  const onClick = () => {
    history.push('/other');
  };

  return (
    <div>App
      <button className={styles.but} onClick={onClick}>other</button>
    </div>
  );
};

export default Home;
