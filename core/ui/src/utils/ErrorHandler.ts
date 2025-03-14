import { notification, NotificationType } from './rc-notification';

export enum ErrorType {
  InvalidWallet = 'InvalidWallet',
  TransactionFailed = 'TransactionFailed',
  InsufficientBalance = 'InsufficientBalance',
  GetAccountInfoFailed = 'GetAccountInfoFailed'
}

export const ErrorMsgMap = {
  [ErrorType.InvalidWallet]: 'Invalid wallet, please connect the wallet.',
  [ErrorType.TransactionFailed]: 'Transaction failed. Please try again later.',
  [ErrorType.InsufficientBalance]: 'Insufficient balance.',
  [ErrorType.GetAccountInfoFailed]:
    'Get Account Information failed. Please try again later.'
};

export const handleError = (errorType: ErrorType): void => {
  if (errorType === ErrorType.TransactionFailed) {
    notification(
      ErrorMsgMap[ErrorType.TransactionFailed],
      NotificationType.Error
    );
  } else if (errorType === ErrorType.InsufficientBalance) {
    notification(
      ErrorMsgMap[ErrorType.InsufficientBalance],
      NotificationType.Error
    );
  }
};
