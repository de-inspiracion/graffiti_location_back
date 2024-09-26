import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDocument } from './auth.document';
import { CollectionReference } from '@google-cloud/firestore';
import { AuthDto } from './dto/auth.dto';
import { AuthResponse } from './models/auth.response';
import { HashUtils } from '../shared/utils/hash.utils';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class AuthService {
  private logger: Logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private authModel: Model<UserDocument>,
    @Inject(AuthDocument.collectionName)
    private authCollection: CollectionReference<AuthDocument>,
    private jwtService: JwtService,
    private eventEmitter: EventEmitter2,
  ) {}

  async signIn(auth: AuthDto): Promise<AuthResponse> {
    try {
      this.logger.log(`login: ${JSON.stringify(auth)}`);
      const user = await this.authModel
        .findOne({ username: auth.username })
        .exec();
      if (!user)
        throw new UnauthorizedException('Usuario y/o contraseña incorrectos');
      const isMatch = await HashUtils.comparePassword(
        auth.password,
        user.password,
      );
      if (!isMatch)
        throw new UnauthorizedException('Usuario y/o contraseña incorrectos');
      const payload = { user: user.username, ps: user.password };
      const token = this.jwtService.sign(payload);
      return { message: 'Login exitoso', token: token };
    } catch (error) {
      this.eventEmitter.emit('error', error);
      return Promise.reject(error);
    }
  }

  async signUp(auth: AuthDto): Promise<AuthResponse> {
    try {
      const existingUser = await this.authModel
        .findOne({ username: auth.username })
        .exec();
      if (existingUser) throw new UnauthorizedException('Usuario ya existe');

      const passwordHash = await HashUtils.hashPassword(auth.password);
      const newUser = new this.authModel({ ...auth, password: passwordHash });
      const savedUser = await newUser.save();

      this.logger.log(`Usuario creado: ${JSON.stringify(savedUser)}`);

      const payload = { user: savedUser.username, ps: savedUser.password };
      const token = this.jwtService.sign(payload);
      return { message: 'Usuario creado correctamente', token: token };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getProfile(username: string): Promise<Partial<AuthDocument>> {
    try {
      const user = await this.authModel
        .findOne({ username: username }, 'username')
        .exec();
      return user ? user.toObject() : null;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  //DEPRECATED
  // async signInFirebase(auth: AuthDto): Promise<AuthResponse> {
  //     try {
  //         this.logger.log(`login: ${JSON.stringify(auth)}`);
  //         const docRef = this.authCollection.where('username', '==', auth.username).limit(1);
  //         const authDoc = await docRef.get();
  //         if (authDoc.empty) throw new UnauthorizedException('Usuario y/o contraseña incorrectos');
  //         const authData = authDoc.docs[0].data();
  //         const isMatch = await HashUtils.comparePassword(auth.password, authData.password);
  //         if (!isMatch) throw new UnauthorizedException('Usuario y/o contraseña incorrectos');
  //         const payload = { user: authData.username, ps: authData.password };
  //         const token = this.jwtService.sign(payload);
  //         return { message: 'Login exitoso', token: token };
  //     } catch (error) {
  //         this.eventEmitter.emit('error', error);
  //         return Promise.reject(error);
  //     }
  // }

  // async signUpFirebase(auth: AuthDto): Promise<AuthResponse> {
  //     try {
  //         const docRefVerify = this.authCollection.where('username', '==', auth.username).limit(1);
  //         const authDoc = await docRefVerify.get();
  //         if (!authDoc.empty) throw new UnauthorizedException('Usuario ya existe');
  //         const docRef = this.authCollection.doc();
  //         const passwordHash = await HashUtils.hashPassword(auth.password);
  //         auth.password = passwordHash;
  //         const authCreated = await docRef.set({ ...auth });
  //         this.logger.log(`Usuario creado: ${JSON.stringify(authCreated)}`);
  //         const userDoc = await docRef.get();
  //         const userData = userDoc.data();
  //         const payload = { user: userData.username, ps: userData.password };
  //         const token = this.jwtService.sign(payload);
  //         return { message: 'Usuario creado correctamente', token: token };
  //     } catch (error) {
  //         return Promise.reject(error);
  //     }
  // }

  // async getProfileFirebase(username: string): Promise<Partial<AuthDocument>> {
  //     try {
  //         const docRef = this.authCollection.where('username', '==', username)
  //             .limit(1)
  //             .select('username');
  //         const authDoc = await docRef.get();
  //         const authData = authDoc.docs[0].data();
  //         return authData;
  //     } catch (error) {
  //         return Promise.reject(error);
  //     }
  // }
}
