import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

export const CarZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number().int().min(2).min(4),
  seatsQty: z.number().int().min(2).min(7),
});

export type ICar = z.infer<typeof CarZodSchema>;