import { z } from "zod";

export const zCreateIdeaTrpcInput = z.object({
  name: z.string().min(3),
  nick: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, numbers and dashes'),
  description: z.string().min(3),
  text: z.string().min(50, 'Text should be at least 50 characters long'),
})