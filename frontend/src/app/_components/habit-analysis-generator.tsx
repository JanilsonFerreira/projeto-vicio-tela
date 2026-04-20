"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HabitAnalysisData } from "@/types/habit-analysis-data.type";
import { Loader, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

export function HabitAnalysisGenerator({ data }: { data: HabitAnalysisData }) {
  const [output, setOutput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const controllerRef = useRef<AbortController | null>(null);

  async function startStreaming() {
    const controller = new AbortController();
    controllerRef.current = controller;

    setOutput("");
    setIsStreaming(true);

    try {
      const response = await fetch("http://localhost:3333/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: data.nome,
          idade: data.idade,
          sexo: data.sexo,
          dispositivo_uso: data.dispositivo_uso,
          tipo_uso: data.tipo_uso,
          nivel_uso: data.nivel_uso,
          horas_uso: data.horas_uso,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Erro ao gerar análise de hábitos de uso");
      }

      if (!response.body) {
        throw new Error("Resposta sem body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        accumulatedText += decoder.decode(value, { stream: true });
        setOutput(accumulatedText);
      }
    } catch (err: any) {
      if (err.name === "AbortError") {
        console.log("REQUEST CANCELADA");
        return;
      }

      console.error(err);
      setOutput("Erro ao gerar análise de hábitos de uso. Tente novamente.");
    } finally {
      setIsStreaming(false);
      controllerRef.current = null;
    }
  }

  async function handleGenerate() {
    if (isStreaming) {
      controllerRef.current?.abort();
      setIsStreaming(false);
      return;
    }

    await startStreaming();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl border-0 p-4 md:p-6">
        <div className="flex justify-center gap-4">
          <Button
            className="cursor-pointer gap-2"
            size="lg"
            onClick={handleGenerate}
          >
            {isStreaming ? (
              <Loader className="animate-spin" />
            ) : (
              <Sparkles className="w-6 h-6" />
            )}
            {isStreaming ? "Parar análise de hábitos de uso" : "Gerar análise de hábitos de uso"}
          </Button>
        </div>

        {output && (
          <div className="mt-6 bg-card rounded-lg p-6 border border-border max-h-[500px] overflow-y-auto">
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ ...props }) => (
                    <h1 className="text-2xl font-bold text-zinc-900 mb-4" {...props} />
                  ),
                  h2: ({ ...props }) => (
                    <h2 className="text-xl font-bold text-blue-600 mt-6 mb-2" {...props} />
                  ),
                  p: ({ ...props }) => (
                    <p className="leading-7 text-zinc-700 mb-3" {...props} />
                  ),
                  li: ({ ...props }) => (
                    <li className="mb-1 text-zinc-700" {...props} />
                  ),
                }}
              >
                {output}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}