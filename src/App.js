import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import BazaarItemListing from './contracts/BazaarItemListing.json';
import Bazaar from './components/Bazaar';

const App = () => {
  const [account, setAccount] = useState('');
  const [bazaarContract, setBazaarContract] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = BazaarItemListing.networks[networkId];
      const bazaarInstance = new web3.eth.Contract(
        BazaarItemListing.abi,
        deployedNetwork && deployedNetwork.address
      );
      setBazaarContract(bazaarInstance);

      setLoading(false);
    };
    init();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h1 className="text-center">Supply Chain DApp</h1>
        <h4 className="text-center text-muted">Account: {account}</h4>
        <Bazaar bazaarContract={bazaarContract} account={account} />
      </div>
    </div>
  );
};

export default App;
