import { z } from "zod";

export const HabitAnalysisRequestSchema = z.object({
  nome: z.string().min(2),
  idade: z.number().positive(),
  sexo: z.enum(["masculino", "feminino"]),
  dispositivo_uso: z.enum(["apenas_computador", "apenas_celular", "computador_celular"]),
  tipo_uso: z.enum(["apenas_trabalho", "apenas_lazer", "trabalho_lazer"]),
  nivel_uso: z.enum(["infrequentemente", "2x_semana", "4x_semana", "todos_dias"]),
  horas_uso: z.enum(["menos_1_hora", "1_hora", "2_horas", "4_horas", "6_horas", "mais_6_horas"]),
});

export type HabitAnalysisRequest = z.infer<typeof HabitAnalysisRequestSchema>;
