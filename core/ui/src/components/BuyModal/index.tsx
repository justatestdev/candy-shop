import { BN } from '@project-serum/anchor';
import { web3 } from '@project-serum/anchor';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import Modal from 'components/Modal';
import Processing from 'components/Processing';
import { CandyShop, getAtaForMint } from '@liqnft/candy-shop-sdk';
import React, { useState, useContext } from 'react';
import { Order as OrderSchema } from 'solana-candy-shop-schema/dist';
import { ErrorMsgMap, ErrorType, handleError } from 'utils/ErrorHandler';
import { notification, NotificationType } from 'utils/rc-notification';
import { TransactionState } from '../../model';
import BuyModalConfirmed from './BuyModalConfirmed';
import BuyModalDetail from './BuyModalDetail';
import { getAccount } from '@solana/spl-token';
import { WRAPPED_SOL_MINT } from '@liqnft/candy-shop-sdk';
import { CandyActionContext } from 'public/Context';
import { useUnmountTimeout } from 'hooks/useUnmountTimeout';
import { TIMEOUT_REFETCH_NFT } from 'constant';
import './style.less';

export interface BuyModalProps {
  order: OrderSchema;
  onClose: () => void;
  wallet: AnchorWallet | undefined;
  candyShop: CandyShop;
  walletConnectComponent: React.ReactElement;
}

export const BuyModal: React.FC<BuyModalProps> = ({
  order,
  onClose,
  wallet,
  candyShop,
  walletConnectComponent
}) => {
  const [state, setState] = useState<TransactionState>(
    TransactionState.DISPLAY
  );
  const [hash, setHash] = useState(''); // txHash

  const { setRefetch } = useContext(CandyActionContext);

  const timeoutRef = useUnmountTimeout();

  const buy = async () => {
    if (!wallet) {
      notification(
        ErrorMsgMap[ErrorType.InvalidWallet],
        NotificationType.Error
      );
      return;
    }
    setState(TransactionState.PROCESSING);
    // check balance before proceed
    let balance: BN;
    const connection = await candyShop.connection();

    if (candyShop.treasuryMint.equals(WRAPPED_SOL_MINT)) {
      const account = await connection.getAccountInfo(wallet.publicKey);
      if (!account) {
        notification(
          ErrorMsgMap[ErrorType.GetAccountInfoFailed],
          NotificationType.Error
        );
        return;
      }
      balance = new BN(account.lamports.toString());
    } else {
      // prettier-ignore
      const ata = (await getAtaForMint(candyShop.treasuryMint, wallet.publicKey))[0];
      try {
        const account = await getAccount(connection, ata);
        balance = new BN(account.amount.toString());
      } catch (err) {
        balance = new BN('0');
      }
    }
    if (balance.lt(new BN(order.price))) {
      setState(TransactionState.DISPLAY);
      return handleError(ErrorType.InsufficientBalance);
    }

    return candyShop
      .buy(
        new web3.PublicKey(order.walletAddress),
        new web3.PublicKey(order.tokenAccount),
        new web3.PublicKey(order.tokenMint),
        new BN(order.price),
        wallet
      )
      .then((txHash) => {
        setHash(txHash);
        console.log('Buy order made with transaction hash', txHash);
        timeoutRef.current = setTimeout(() => {
          setState(TransactionState.CONFIRMED);
        }, TIMEOUT_REFETCH_NFT);
      })
      .catch((err) => {
        console.log({ err });
        handleError(ErrorType.TransactionFailed);
        setState(TransactionState.DISPLAY);
      });
  };

  const closeModal = () => {
    onClose();
    if (TransactionState.CONFIRMED === state) {
      setRefetch();
    }
  };

  return (
    <Modal
      onCancel={closeModal}
      width={state !== TransactionState.DISPLAY ? 600 : 1000}
    >
      <div className="candy-buy-modal">
        {state === TransactionState.DISPLAY && (
          <BuyModalDetail
            order={order}
            buy={buy}
            walletPublicKey={wallet?.publicKey}
            walletConnectComponent={walletConnectComponent}
            candyShop={candyShop}
          />
        )}
        {state === TransactionState.PROCESSING && (
          <Processing text="Processing purchase" />
        )}
        {state === TransactionState.CONFIRMED && wallet && (
          <BuyModalConfirmed
            walletPublicKey={wallet.publicKey}
            order={order}
            txHash={hash}
            candyShop={candyShop}
            onClose={onClose}
          />
        )}
      </div>
    </Modal>
  );
};
