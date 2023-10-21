export class ErrorResponseHandler extends Error {
  originalError: string;
  errorCode: string;
  sendSupportMail: boolean = false;
  constructor(
    message: string,
    errorCode: string,
    originalError: string,
    sendSupportMail: boolean,
  ) {
    super(message);
    this.originalError = originalError;
    this.errorCode = errorCode;
    this.sendSupportMail = sendSupportMail;
  }
}

// TODO: Add Error code list
//
