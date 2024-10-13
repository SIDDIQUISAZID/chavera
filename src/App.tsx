import React, { Suspense } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-tooltip/dist/react-tooltip.css";
import { FullScreenLoader } from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';
import AppTooltip from './components/Tooltip';
import Router from './Router';
function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<FullScreenLoader />}>
        <Router />
        <ToastContainer />
        <AppTooltip />
      </Suspense>
    </ErrorBoundary>
  );
}
export default App
