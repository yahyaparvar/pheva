// src/ga4.js
import ReactGA from 'react-ga4';

export const initGA = () => {
  const measurementId = process.env.REACT_APP_GA4_MEASUREMENT_ID;
  if (measurementId) {
    ReactGA.initialize(measurementId);
  } else {
    console.error('GA4 Measurement ID not found');
  }
};

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};
