import { ApplicationError } from '@/protocols';

export function ticketTypeIsNotRemoteError(): ApplicationError {
  return {
    name: 'TicketTypeIsNotRemoteError',
    message: 'Ticket type must be remote!',
  };
}
