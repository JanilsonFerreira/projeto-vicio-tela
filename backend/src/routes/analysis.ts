import type { FastifyInstance } from "fastify";
import { generateHabitAnalysis } from "../agent";
import { HabitAnalysisRequestSchema } from "../types";

export async function analysisRoutes(app: FastifyInstance) {
  app.post("/plan", async (request, reply) => {
    const parse = HabitAnalysisRequestSchema.safeParse(request.body);

    if (!parse.success) {
      return reply.status(400).send({
        error: "ValidationError",
        details: parse.error.flatten((issue) => issue.message),
      });
    }

    reply.raw.setHeader("Access-Control-Allow-Origin", "*");
    reply.raw.setHeader("Content-Type", "text/plain; charset=utf-8");
    reply.raw.setHeader("Cache-Control", "no-cache");
    reply.raw.setHeader("Connection", "keep-alive");

    try {
      for await (const delta of generateHabitAnalysis(parse.data)) {
        reply.raw.write(delta);
      }

      reply.raw.end();
    } catch (err: any) {
      request.log.error(err);
      if (err.status == 429) { reply.raw.write("\n\nErro ao analisar os seus hábitos de uso (limite de uso de API excedido)."); }
      else if (err.status == 503) { reply.raw.write("\n\nErro ao analisar os seus hábitos de uso (API está indisponível devido a pico de uso)."); }
      else { reply.raw.write("\n\nErro ao analisar os seus hábitos de uso."); }
      reply.raw.end();
    }

    return reply;
  });
}