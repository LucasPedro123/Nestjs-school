import { HashingService } from './hashing.service';
import * as bcrypt from 'bcryptjs';

export class BcryptService implements HashingService {
  async hash(passoword: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(passoword, salt);
  }
  async compare(passoword: string, passowordHash: string): Promise<boolean> {
    return bcrypt.compare(passoword, passowordHash);
  }
}
