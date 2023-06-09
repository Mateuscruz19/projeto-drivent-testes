import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelService from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const hotels = await hotelService.getHotels(userId);
    res.send(hotels).status(200);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name === 'PaymentError') {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    } else {
      return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const hotelId = parseInt(id);
  const userId = req.userId;

  try {
    const result = await hotelService.getHotelById(hotelId, userId);
    return res.send(result).status(200);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name === 'PaymentError') {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    } else {
      return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
