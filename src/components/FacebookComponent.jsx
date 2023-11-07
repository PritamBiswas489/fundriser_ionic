import React from 'react';
import { FacebookProvider, LoginButton } from 'react-facebook';

const FacebookComponent = () => {
  const handleSuccess = (response) => {
    if (response.status === 'connected') {
      const { authResponse } = response;
      if (authResponse) {
        // User is logged in; you can access user data using authResponse.
        alert(authResponse.email);
      }
    } else {
      // Login was not successful.
    }
  };

  return (
    <FacebookProvider appId="1712990242530062">
       
      <LoginButton
        scope="public_profile,email"
        
        onSuccess={handleSuccess}
      >
        Login via Facebook
      </LoginButton>
    </FacebookProvider>
  );
};

export default FacebookComponent;
