/* eslint-disable @next/next/no-img-element */

import { WalletMultiButton } from '@solana/wallet-adapter-ant-design';
import React from 'react';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <div className={'header-container'}>
      <a href={'https://solice.io/'} className={'header-logo'}>
        <img
          src="https://solice.io/images/solice_logo_name_right_white.png"
          alt={'Solice Logo'}
        />
      </a>
      <nav className={'header-nav'}>
        <a href={'https://solice.io/map'} className={'header-navLink'}>
          Map
        </a>
        <a href={'https://solice.io/marketplace'} className={'header-navLink'}>
          Marketplace
        </a>
        <a href={'https://staking.solice.io'} className={'header-navLink'}>
          Staking
        </a>
        <WalletMultiButton />
      </nav>
    </div>
  );
};

export default Header;
