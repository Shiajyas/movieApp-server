import { container } from 'tsyringe';
import { IUserRepository } from '../repositories/IUserRepository';
// import { MongoUserRepository } from '../repositories/MongoUserRepository';
import { IFavoritesRepository } from '../repositories/IFavoritesRepository';
import { FileFavoritesRepository } from '../repositories/FileFavoritesRepository';
import { OmdbClient } from '../datasources/OmdbClient';

// bind interfaces to implementations
// container.registerSingleton<IUserRepository>('IUserRepository', MongoUserRepository);
container.registerSingleton<IFavoritesRepository>('IFavoritesRepository', FileFavoritesRepository);

// register concrete classes (for direct resolve if needed)
container.registerSingleton(OmdbClient);
