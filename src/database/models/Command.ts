import { model, Schema } from "mongoose";

import type ICommand from "./interfaces/ICommand";

const CommandSchema = new Schema<ICommand>({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export default model<ICommand>("command", CommandSchema);
