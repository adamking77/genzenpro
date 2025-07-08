import React, { useEffect } from 'react';

export function ClientTest() {
  useEffect(() => {
    console.log('[ClientTest] useEffect running! Client-side JS for React is active.');
    document.body.style.backgroundColor = 'lime'; // Very obvious visual change
    alert('ClientTest useEffect ran!'); // Very intrusive alert
  }, []);

  return (
    <div style={{ position: 'fixed', top: '0', left: '0', padding: '5px', background: 'yellow', color: 'black', zIndex: '9999' }} data-testid="client-test-component">
      Client Test Component Loaded (useEffect should make page green and show alert)
    </div>
  );
}