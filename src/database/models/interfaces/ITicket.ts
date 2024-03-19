import type { Document, Types } from "mongoose";

export default interface ITicket {
  title: string;
  opener: string;
  contents: {
    text: string;
    senderId: Types.ObjectId;
    sentAt: Date;
    seen?: boolean;
    seenAt?: Date;
  }[];
  openedAt: Date;
  closedAt?: Date;
  category: string;
  isOpen?: boolean;
  deleted: boolean;
  deletedAt?: Date;
}

export interface ITicketDocument extends ITicket, Document {}
