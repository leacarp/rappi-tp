/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { IUserRepository } from '../domain/interfaces/IUserRepository';
import { USER_REPOSITORY_TOKEN } from '../domain/tokens/user-repository.token';
import { PRODUCT_ADAPTER } from '../../products/infrastructure/constants/product-adapter.constants';
import { User } from '../domain/entities/user.entity';
import { Profile } from '../domain/entities/profile.entity';
import { Address } from '../domain/entities/address.entity';
import { History } from '../domain/entities/history.entity';

describe('UserService', () => {
  let service: UserService;
  let userRepository: jest.Mocked<IUserRepository>;

  beforeEach(async () => {
    const mockUserRepository = {
      getUserById: jest.fn(),
    };

    const mockProductAdapter = {
      getProductById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: USER_REPOSITORY_TOKEN, useValue: mockUserRepository },
        { provide: PRODUCT_ADAPTER, useValue: mockProductAdapter },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(USER_REPOSITORY_TOKEN);
  });

  it('debería retornar las direcciones de un usuario existente', async () => {
    const userId = 'user123';
    const mockAddress1 = new Address('addr1', 'Calle Falsa 123', 'Springfield', '1234', true);
    const mockAddress2 = new Address('addr2', 'Av. Siempre Viva 742', 'Springfield', '5678', false);
    const mockProfile = new Profile('Juan Pérez', [mockAddress1, mockAddress2]);
    const mockUser = new User(
      userId,
      'juan@test.com',
      'password123',
      'customer',
      mockProfile,
      [],
      new History([], []),
      [],
      new Date(),
      new Date(),
      []
    );

    userRepository.getUserById.mockResolvedValue(mockUser);

    const result = await service.getAddresses(userId);

    expect(userRepository.getUserById).toHaveBeenCalledWith(userId);
    expect(userRepository.getUserById).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result.getAddresses().length).toBe(2);
    expect(result.getAddresses()[0].getStreet()).toBe('Calle Falsa 123');
  });

  it('debería lanzar NotFoundException cuando el usuario no existe', async () => {
    const userId = 'usuarioInexistente';

    userRepository.getUserById.mockResolvedValue(null);

    await expect(service.getAddresses(userId)).rejects.toThrow(NotFoundException);
    await expect(service.getAddresses(userId)).rejects.toThrow('Usuario no encontrado');
    expect(userRepository.getUserById).toHaveBeenCalledWith(userId);
  });
});

