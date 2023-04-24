import { ApplicationError } from '@/protocols';

export function ticketNotPaidError(): ApplicationError {
  return {
    name: 'TicketNotPaidError',
    message: 'Ticket is not paid!',
  };
}
