import React, { createContext } from 'react';
import { SkynetClient } from 'skynet-js';

const SkynetContext = createContext(undefined);

// We'll define a portal to allow for developing on localhost.
// When hosted on a skynet portal, SkynetClient doesn't need any arguments.
const portal = 'https://web3portal.com';

// Initiate the SkynetClient
const client = new SkynetClient(portal);

const SkynetProvider = ({ children }) => {

  return (
    <SkynetContext.Provider value={client}>
      {children}
    </SkynetContext.Provider>
  );
};

export { SkynetContext, SkynetProvider };