export interface dialog {
  isShown: boolean;
  headline: string;
  message: string;
  buttons: buttons;
}

export interface buttons {
  firstButtonText: string;
  secondButtonText?: string;
}
