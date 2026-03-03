declare module 'bcrypt' {
  export function hash(data: string | Buffer, saltOrRounds: string | number): Promise<string>;
  export function compare(data: string | Buffer, encrypted: string): Promise<boolean>;

  const bcrypt: {
    hash: typeof hash;
    compare: typeof compare;
  };

  export default bcrypt;
}

declare module 'jsonwebtoken' {
  export function sign(
    payload: object | string | Buffer,
    secretOrPrivateKey: string,
    options?: { expiresIn?: string | number },
  ): string;

  export function verify(token: string, secretOrPublicKey: string): string | object;

  const jwt: {
    sign: typeof sign;
    verify: typeof verify;
  };

  export default jwt;
}
