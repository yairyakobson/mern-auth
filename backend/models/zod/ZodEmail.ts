import { z } from "zod";

export const zodEmailSchema = z.string().email().min(1).max(255);