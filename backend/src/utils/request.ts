import { Request } from "express";

export const getHost = (req: Request): string =>
  `${req.protocol}://${req.get('host')}`;