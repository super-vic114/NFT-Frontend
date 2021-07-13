import { useEffect } from 'react';
import { ethers } from 'ethers';
import abi from '../../contracts/nft-factory.abi.json';
import { NFT_FACTORY_ADDRESS } from '../../constants/contract-address';
import { useWallet } from 'use-wallet';
import { getOwner } from '../../contracts/nft-contract';
import { produce } from '../../contracts/nft-factory';

import MintNFT from '../../components/mint-nft';

const Home = () => {

  const wallet = useWallet()
  
  const connectWallet = () => {
    
    if (wallet.status !== 'connected') {
        console.log('Connecting Wallet');
        wallet.connect();
    } else {
        console.log('Wallet is already connected');
    }
  }

  const mintNFT = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const newNFTAddress = await produce();
    console.log({ newNFTAddress });
    const nft = new ethers.Contract(newNFTAddress, abi, signer);
    nft.initialize();
    console.log();
  }


  return (
    <div>
      <h2>Non Fungible Contract</h2>
      <button onClick={connectWallet}>Connect Wallet</button>
      <MintNFT></MintNFT>
    </div>
  );
}

export default Home;
