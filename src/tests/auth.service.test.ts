import { jest } from '@jest/globals';

jest.unstable_mockModule('../config/prisma.js', () => ({
    prisma: {
        user: {
            create: jest.fn(),
            findUnique: jest.fn()
        }
    }
}));

jest.unstable_mockModule('bcrypt', () => ({
    default: {
     genSalt: jest.fn(() => Promise.resolve('salt')),
             hash: jest.fn(() => Promise.resolve('hashedPassword')),
             compare: jest.fn()
    }
}));

jest.unstable_mockModule('../util/generateToken.js', () => ({
    generateToken: jest.fn(() => 'mock-token')
}));


const { prisma } = await import('../config/prisma.js');
const { AuthService } = await import('../services/auth.service.js');
const { default: bcrypt } = await import('bcrypt');

describe('AuthService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    
    it('should create a new user and return userData', async () => {
        const userData = { name: 'john Doe', email: 'john@example.com', password: 'password123', role: 'DEVELOPER' };
        const mockUser = { id: '1', ...userData, password: 'hashedPassword' };

        (prisma.user.create as any).mockResolvedValue(mockUser);

        const result = await AuthService.createUser(userData);
        
        expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, expect.any(String));
        expect(result).toHaveProperty('token', 'mock-token');
        expect(result).not.toHaveProperty('password');
    });

    it('should login user and return userData with token', async () => {
        const loginData = { email: 'john@example.com', password: 'password123' };
        const mockUser = { id: '1', name: 'John Doe', email: loginData.email, password: 'hashedPassword', role: 'DEVELOPER' };

        (prisma.user.findUnique as any).mockResolvedValue(mockUser);
        (bcrypt.compare as any).mockResolvedValue(true);

        const result = await AuthService.loginUser(loginData);

        expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: loginData.email } });
        expect(result).toHaveProperty('token', 'mock-token');
    });

    it('should throw error if user not found during login', async () => {
        const loginData = { email: 'test@test.com', password: 'wrongpassword' };

        (prisma.user.findUnique as any).mockResolvedValue(null);

        await expect(AuthService.loginUser(loginData))
            .rejects
            .toThrow('invalid credentials'); 
    });
});