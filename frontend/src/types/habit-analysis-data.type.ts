export interface HabitAnalysisData {
  nome: string;
  idade: number;
  sexo: "masculino" | "feminino";
  dispositivo_uso: "apenas_computador" | "apenas_celular" | "computador_celular";
  tipo_uso: "apenas_trabalho" | "apenas_lazer" | "trabalho_lazer";
  nivel_uso: "infrequentemente" | "2x_semana" | "4x_semana" | "todos_dias";
  horas_uso: "menos_1_hora" | "1_hora" | "2_horas" | "4_horas" | "6_horas" | "mais_6_horas";
}