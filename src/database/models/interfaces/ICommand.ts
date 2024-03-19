import type { Document, Types } from "mongoose";

export default interface ICommand {
  title: string;
  description: string;
}

export interface ICommandDocument extends ICommand, Document {}
