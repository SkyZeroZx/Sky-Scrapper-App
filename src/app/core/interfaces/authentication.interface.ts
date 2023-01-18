import { PublicKeyCredentialRequestOptionsJSON } from '@simplewebauthn/typescript-types';
import { UserLoginResponse } from '@core/interfaces';

export interface Authentication {
  idAuthentication: string;
  userEmail: string;
  credentialID: Buffer;
  credentialPublicKey: Buffer;
}

export interface PublicKeyCredentialRequestOptionsJSONWithUser
  extends PublicKeyCredentialRequestOptionsJSON {
  data: UserLoginResponse;
}
