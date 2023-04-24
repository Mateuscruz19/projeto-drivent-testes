import { Hotel, Room } from '@prisma/client';
import { prisma } from '@/config';

async function findHotels() {
  return await prisma.hotel.findMany();
}

async function findHotelRooms(hotelId: number) {
  const hotel: Hotel & { Rooms?: Room[] } = await prisma.hotel.findFirst({
    where: { id: hotelId },
  });

  const rooms = await prisma.room.findMany({
    where: { hotelId: hotel.id },
  });

  return {
    id: hotel.id,
    name: hotel.name,
    Image: hotel.image,
    createdAt: hotel.createdAt,
    updatedAt: hotel.updatedAt,
    Rooms: rooms,
  };
}

const hotelRepository = {
  findHotels,
  findHotelRooms,
};

export default hotelRepository;
