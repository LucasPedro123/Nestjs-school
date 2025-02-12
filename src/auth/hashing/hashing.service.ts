// Protocol
export abstract class HashingService {
  abstract hash(passoword: string): Promise<string>;
  abstract compare(passoword: string, passowordHash: string): Promise<boolean>;
}
