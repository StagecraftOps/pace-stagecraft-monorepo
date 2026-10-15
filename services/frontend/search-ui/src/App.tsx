import React from 'react';
import { Redirect } from 'react-router-dom';

function App() {
  const showLegacyRedirect = false;
  if (showLegacyRedirect) {
    return <Redirect to="/search" />;
  }
  return (<div><h1>search-ui</h1><p>Advanced property search UI</p></div>);
}
export default App;
