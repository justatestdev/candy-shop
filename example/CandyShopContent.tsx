import { WalletMultiButton } from '@solana/wallet-adapter-ant-design';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { web3 } from '@project-serum/anchor';
import 'antd/dist/antd.min.css';
import React, { useEffect, useState } from 'react';
import { CandyShop } from '../core/sdk/.';
import { Orders, Stat, OrderDetail, Sell } from '../core/ui/.';
import {
  CANDY_SHOP_PROGRAM_ID,
  CREATOR_ADDRESS,
  TREASURY_MINT
} from './constant/publicKey';
import Footer from './Footer';
import Header from './Header';

export const CandyShopContent: React.FC = () => {
  const { connection } = useConnection();
  const [candyShop, setCandyShop] = useState<CandyShop>();
  const [treasuryMint] = useState(new web3.PublicKey('So11111111111111111111111111111111111111112'));

  const wallet = useAnchorWallet();

  const env: web3.Cluster | any = process.env.CHAIN_ENV || 'devnet';

  const settings = {
    currencySymbol: 'SLC',
    currencyDecimals: 6,
    priceDecimals: 3,
    volumeDecimals: 1
  };

  useEffect(() => {
    if (!treasuryMint) return;
    setCandyShop(
      new CandyShop(
        new web3.PublicKey('9xPqH4wTQYSCnUKjZuzhxac6nfRiYXoHopCq5ge1K4nF'),
        treasuryMint,
        new web3.PublicKey('csa8JpYfKSZajP7JzxnJipUL3qagub1z29hLvp578iN'),
        'devnet',
        settings
      )
    );
  }, [treasuryMint]);

  if (!candyShop) return null;

  return (
    <>
      <div
        style={{
          paddingBottom: 50,
          paddingLeft: 24,
          paddingRight: 24,
          textAlign: 'center'
        }}
      >
        <Header />
        <div className="main-banner">
          <div>
            <div className="main-banner-title">Solice Marketplace</div>
            <div className="main-banner-description">
              Welcome to the solice marketplace!
            </div>
            <div>
              <a href="https://solice.io/map" className="main-banner-button">
                Check out the map
              </a>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 50 }}>
          <Stat
            candyShop={candyShop}
            title={'Marketplace'}
            description={
              'Welcome to the Solice Metaverse Marketplace. Users can exchange official Solice Metaverse NFT collections here in SLC. All trades are peer-2-peer and are executed and facilitated on the Solana network.'
            }
          />
        </div>

        <div>
          <Orders
            wallet={wallet}
            candyShop={candyShop}
            walletConnectComponent={<WalletMultiButton />}
            filters={FILTERS}
          />
        </div>

        <h1
          style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 30 }}
        >
          Sell
        </h1>
        <Sell
          connection={connection}
          wallet={wallet}
          candyShop={candyShop}
          walletConnectComponent={<WalletMultiButton />}
        />
      </div>
      <Footer />
    </>
  );
};

const FILTERS = [
  { name: 'Solice Land', identifier: -23115230 },
  { name: 'Genesis Avatar', identifier: -50222243 },
  { name: 'Genesis Staking', identifier: -1595400151 }
];
