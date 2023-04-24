import { Router } from 'express';
import { findHotelRooms, findHotels } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken);

hotelsRouter.get('/', findHotels);

hotelsRouter.get('/:hotelId', findHotelRooms);

export { hotelsRouter };
