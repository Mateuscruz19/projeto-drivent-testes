import { Hotel, Room } from '@prisma/client';
import { prisma } from '@/config';

async function getHotels() {
  return prisma.hotel.findMany();
}

async function getHotelById(hotelId: number): Promise<hotelWithRooms> {
  return prisma.hotel.findUnique({
    where: { id: hotelId },
    include: { Rooms: true },
  });
}

export type hotelWithRooms = Hotel & {
  Rooms: Room[];
};

const hotelRepository = {
  getHotels,
  getHotelById,
};

export default hotelRepository;
