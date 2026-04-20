/*
  2 TIPOS DE PROMPT
  SYSTEM PROMPT - INSTRUÇÕES PARA A IA
  USER PROMPT - INFORMAÇÕES PARA A IA
  DOCS SYSTEM PROMPT - INSTRUÇÕES PARA A IA
*/

import type { HabitAnalysisRequest } from "./types";

export function buildSystemPrompt() {
  return [
    `Você é um agente que analisa os hábitos de uso dos usuários e cria planos de tratamento caso o vício em telas seja detectado.
    Regras fixas:
    - Sempre responda em texto markdown legível para humanos.
    - Use # para títulos e - para itens de lista.
    - A análise deve ser baseada em estudos científicos atuais sobre os assuntos de vício em telas, "brainrot", "doomscrolling", e outros relacionados.
    - Cada ponto da análise deve ser focado em um ponto específico, como os tipos de dispositivos usados e para o que são usados.
    - SEMPRE inclua soluções que a pessoa comum pode facilmente começar a implementar sem altos custos de dinheiro e tempo.
    - NUNCA inclua julgamentos desnecessários sobre os hábitos de uso do usuário.
    - Evite ser genérico na análise, use criatividade no plano de tratamento se for necessário fazer um.
    - Não responda em JSON ou outro formato, apenas texto markdown legível para humanos.
    - Não inclua dicas como: bom consultar um terapeuta para um acompanhamento mais personalizado`,
  ].join("\n");
}

export function buildUserPrompt(input: HabitAnalysisRequest) {
  return [
    "Analise se o usuário possui vício em telas e gere um plano de tratamento caso necessário com base nos dados:",
    `- Nome: ${input.nome}`,
    `- Idade: ${input.idade}`,
    `- Sexo: ${input.sexo}`,
    `- Dispositivos usados: ${input.dispositivo_uso}`,
    `- Tipo de uso: ${input.tipo_uso}`,
    `- Nível de uso: ${input.nivel_uso}`,
    `- Horas de uso: ${input.horas_uso}`,
  ].join("\n");
}

export function buildDocsSystemPrompt(doc: string) {
  return `Documento técnico para ajudar na análise e tratamento de vício em telas: ${doc}`;
}
