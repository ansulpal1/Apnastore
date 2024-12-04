import React from 'react';
import notFound from "../assets/images/output-onlinegiftools.gif"
const NoData = () => {
  return (
    <div style={styles.container}>
      <div style={styles.animationContainer}>
        <img
          src={notFound} // Replace with any animated image or GIF URL
          alt="No Data"
          style={styles.animation}
        />
      </div>
      <h1 style={styles.title}>Oops! No Data Here</h1>
      
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
    fontFamily: "'Arial', sans-serif",
    textAlign: 'center',
    padding: '20px',
  },
  animationContainer: {
    marginBottom: '20px',
  },
  animation: {
    width: '300px',
    height: 'auto',
  },
  title: {
    fontSize: '28px',
    color: '#333',
    marginBottom: '10px',
  },
  message: {
    fontSize: '18px',
    color: '#555',
    maxWidth: '400px',
  },
};

export default NoData;
