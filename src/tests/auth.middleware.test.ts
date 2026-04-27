import { jest } from '@jest/globals';

jest.unstable_mockModule('jsonwebtoken', () => ({
    default: {
        verify: jest.fn()
    }
}));

const { authMiddleware } = await import('../middleware/auth.middleware.js');
const jwt = (await import('jsonwebtoken')).default;

describe('authMiddleware', () => {
    let req: any;
    let res: any;
    let next: any;

    beforeEach(() => {
        req = { headers: {} };
      
        res = { 
            status: jest.fn().mockReturnThis(), 
            json: jest.fn() 
        };
        next = jest.fn();
        jest.clearAllMocks();
    });

    it('should call next if token and user are valid', () => {
        const mockUser = { id: 'user-123', role: 'USER' };
        req.headers.authorization = 'Bearer valid-token';

        (jwt.verify as jest.Mock).mockReturnValue(mockUser);

        authMiddleware(req, res, next);
        
        expect(req.user).toEqual(mockUser);
        expect(next).toHaveBeenCalled();
    });

    it('should return 401 if token is invalid', () => {
        req.headers.authorization = 'Bearer bad-token';

        (jwt.verify as jest.Mock).mockImplementation(() => { 
            throw new Error('invalid'); 
        });

        authMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "invalid token" });
    });
});