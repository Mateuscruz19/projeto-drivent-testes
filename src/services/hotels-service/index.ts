import { notFoundError } from '@/errors';
import { ticketTypeIsNotRemoteError } from '@/errors/ticket-type-remote-error';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelRepository from '@/repositories/hotel-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function findHotels(userId: number) {
  const { id: enrollmentId } = await enrollmentRepository.findEnrollmentByUserId(userId);
  if (!enrollmentId) throw notFoundError();

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollmentId);
  if (!ticket) throw notFoundError();

  if (ticket.status !== 'PAID') throw ticketTypeIsNotRemoteError();

  const { isRemote, includesHotel } = await ticketRepository.findTicketTypeById(ticket.ticketTypeId);
  if (!isRemote || !includesHotel) throw ticketTypeIsNotRemoteError();

  return await hotelRepository.findHotels();
}

async function findHotelRooms(userId: number, hotelId: number) {
  const { id: enrollmentId } = await enrollmentRepository.findEnrollmentByUserId(userId);
  if (!enrollmentId) throw notFoundError();

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollmentId);
  if (!ticket) throw notFoundError();

  if (ticket.status !== 'PAID') throw ticketTypeIsNotRemoteError();

  const { isRemote, includesHotel } = await ticketRepository.findTicketTypeById(ticket.ticketTypeId);
  if (!isRemote || !includesHotel) throw ticketTypeIsNotRemoteError();

  return await hotelRepository.findHotelRooms(hotelId);
}

const hotelsService = {
  findHotels,
  findHotelRooms,
};

export default hotelsService;
