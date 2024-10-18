import React from 'react';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to the application</h1>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    fontFamily: 'Arial, sans-serif',
  }
};

export default HomePage;
