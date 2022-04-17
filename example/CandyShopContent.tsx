import { WalletMultiButton } from '@solana/wallet-adapter-ant-design';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { web3 } from "@project-serum/anchor";
import 'antd/dist/antd.min.css';
import React, { useRef } from 'react';
import { CandyShop, Orders, Stat, OrderDetail, Sell } from '../lib/.';
import {
  CANDY_SHOP_PROGRAM_ID,
  CREATOR_ADDRESS,
  TREASURY_MINT,
} from './constant/publicKey';
import Footer from './Footer';

export const CandyShopContent: React.FC = () => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const env: web3.Cluster = 'devnet';

  const candyShopRef = useRef<CandyShop>(
    new CandyShop(
      new web3.PublicKey(CREATOR_ADDRESS),
      new web3.PublicKey(TREASURY_MINT),
      new web3.PublicKey(CANDY_SHOP_PROGRAM_ID),
      env
    )
  );

  return (
    <>

      <div style={{ paddingBottom: 50, paddingLeft: 24, paddingRight: 24, textAlign: 'center' }}>
        <div className='main-header'>
          <a className='main-header-logo' href="https://solice.io">
            <img src="https://solice.io/images/solice_logo_name_right_white.png" />
          </a>
          <WalletMultiButton />
        </div>
        <div className='main-banner'>
            <div>
              <div className='main-banner-title'>Solice Marketplace</div>
              <div className='main-banner-description'>Welcome to the solice marketplace!</div>
              <div><a href="https://solice.io/map" className='main-banner-button'>Check out the map</a></div>
            </div>
        </div>
        <div style={{ marginBottom: 50 }}>
          <Stat
            candyShop={candyShopRef.current}
            // title={'Marketplace'}
            // description={
            //   'A LAND is a digital piece of real estate in The Solice metaverse that users can acquire to build experiences on top of. Once you own a LAND, you will be able to your own content and fancy it up with Games and Assets. Each LAND is a unique (non-fungible) token lying on the public Solana blockchain.'
            // }
          />
        </div>

        <div >
          <Orders
            wallet={wallet}
            candyShop={candyShopRef.current}
            walletConnectComponent={<WalletMultiButton />}
            
          />
        </div>

        <h1 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 30 }}>Sell</h1>
        <Sell
          connection={connection}
          wallet={wallet}
          candyShop={candyShopRef.current}
          walletConnectComponent={<WalletMultiButton />}
        />
      </div>
      <Footer />
  </>
  );
};
