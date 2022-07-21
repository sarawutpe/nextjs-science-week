import React from 'react';

const Loading = () => {
  return (
    <div className="loading-spinner-wrapper" id="app-loader">
      <span className="loading-spinner">
        <div className="dots">
          <i className="spinner-dot spinner-dot--one"></i>
          <i className="spinner-dot spinner-dot--two"></i>
          <i className="spinner-dot spinner-dot--three"></i>
        </div>
      </span>
    </div>
  );
};

export default Loading;
