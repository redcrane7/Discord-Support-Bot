import { model, Schema } from "mongoose";

import type ITicket from "./interfaces/ITicket";

const TicketSchema = new Schema<ITicket>({
  title: { type: String, required: true },
  opener: { type: String, required: true },
  isOpen: { type: Boolean, default: true },
  openedAt: { type: Date, required: true },
  closedAt: { type: Date, required: false },
  category: { type: String, required: true },

  contents: [
    {
      text: { type: String, required: true },
      senderId: { type: Schema.Types.ObjectId, required: true },
      sentAt: { type: Date, required: true },
      seen: { type: Boolean, default: false },
      seenAt: { type: Date, required: false },
    },
  ],

  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date, required: false },
});

export default model<ITicket>("ticket", TicketSchema);
