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
  const [treasuryMint] = useState(new web3.PublicKey(FFTKNbF95yW764GFKS28wYZETMtQvLPCbEzmEjfpGNkq));

  const wallet = useAnchorWallet();

  const env: web3.Cluster | any = process.env.CHAIN_ENV || 'devnet';

  const settings = {
    currencySymbol: 'FRENCHIE',
    currencyDecimals: 9,
    priceDecimals: 3,
    volumeDecimals: 1
  };

  useEffect(() => {
    if (!treasuryMint) return;
    setCandyShop(
      new CandyShop(
        new web3.PublicKey(TgbBnVXAJU5Le3nfAHm1p3ASyFZJtHmUAjBaUFdYdcZ),
        treasuryMint,
        new web3.PublicKey(csa8JpYfKSZajP7JzxnJipUL3qagub1z29hLvp578iN),
        mainnet,
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
            <div className="main-banner-title">Fancy Frenchies Shop</div>
            <div className="main-banner-description">
              Welcome to the Fancy Frenchies Shop!
            </div>
            <div>
     
        <div style={{ marginBottom: 50 }}>
          <Stat
            candyShop={candyShop}
            title={'Marketplace'}
            description={
              'Welcome to the Fancy Frenchies Shop'
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
  { name: 'FFS', identifier: -1845220214 },
];
