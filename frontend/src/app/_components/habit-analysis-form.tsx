"use client";

import { z } from 'zod'
import { Card } from '@/components/ui/card';
import { AlertOctagon, AlertTriangle, AlertTriangleIcon, BatteryWarning, CircleAlert, CircleHelp, CircleStop, CircleStopIcon, LucideMessageSquareWarning, MessageCircleWarning, MessageSquareWarning, StopCircleIcon, Utensils } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';


const habitAnalysisSchema = z.object({
  nome: z.string().min(2, "O nome é obrigatório"),
  idade: z.number().int().positive(),
  sexo: z.enum(["masculino", "feminino"], { error: "Selecione o sexo" }),
  dispositivo_uso: z.enum(["apenas_computador", "apenas_celular", "computador_celular"], { error: "Selecione o tipo de dispositivo" }),
  tipo_uso: z.enum(["apenas_trabalho", "apenas_lazer", "trabalho_lazer"], { error: "Selecione o tipo de uso" }),
  nivel_uso: z.enum(["infrequentemente", "2x_semana", "4x_semana", "todos_dias"], { error: "Selecione a frequência diária de uso" }),
  horas_uso: z.enum(["menos_1_hora", "1_hora", "2_horas", "4_horas", "6_horas", "mais_6_horas"], { error: "Selecione a frequência horária de uso" }),
})

type HabitAnalysisSchemaFormData = z.infer<typeof habitAnalysisSchema>;

interface HabitAnalysisFormProps {
  onSubmit: (data: HabitAnalysisSchemaFormData) => void
}

export function HabitAnalysisForm({ onSubmit }: HabitAnalysisFormProps) {

  const form = useForm<HabitAnalysisSchemaFormData>({
    resolver: zodResolver(habitAnalysisSchema),
    defaultValues: {
      nome: "",
      idade: undefined,
      sexo: undefined,
      dispositivo_uso: undefined,
      tipo_uso: undefined,
      nivel_uso: undefined,
      horas_uso: undefined,
    },
  })


  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <Card className='w-full max-w-2xl border-0'>
        <div className='p-8'>

          <div className='text-center mb-8'>
            <div className='flex items-center justify-center mb-4 mx-auto'>
              <AlertTriangle className='w-14 h-14 text-blue-500' />
            </div>
            <h1 className='text-3xl font-bold text-blue-500 mb-2'>Saiba se você possui vicio em telas</h1>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-6'
            >

              <div className='space-y-4'>
                <h3 className='text-lg font-semibold text-gray-900 flex items-center'>
                  Dados pessoais
                </h3>
              </div>

              {/* CAMPOS NOME, IDADE E SEXO */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Digite seu nome...'
                        />
                      </FormControl>
                    </FormItem>
                  )}

                />


                <FormField
                  control={form.control}
                  name="idade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idade</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          step="any"
                          {...form.register("idade", {
                            setValueAs: (v) => v === "" ? undefined : Number(v),
                          })}
                          placeholder='Ex: 28'
                        />
                      </FormControl>
                    </FormItem>
                  )}

                />

                <FormField
                  control={form.control}
                  name="sexo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sexo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder="Selecione o sexo" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="masculino">Masculino</SelectItem>
                          <SelectItem value="feminino">Feminino</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>


              {/* CAMPOS TIPO DE DISPOSITIVO E TIPO DE USO*/}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name="dispositivo_uso"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de dispositivo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder="Selecione o tipo de dispositivo" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="apenas_computador">Computador</SelectItem>
                          <SelectItem value="apenas_celular">Celular</SelectItem>
                          <SelectItem value="computador_celular">Computador + Celular</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tipo_uso"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de uso</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder="Selecione o tipo de uso" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="apenas_trabalho">Trabalho</SelectItem>
                          <SelectItem value="apenas_lazer">Lazer</SelectItem>
                          <SelectItem value="trabalho_lazer">Trabalho + Lazer</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              {/* CAMPOS NÍVEL DE USO E HORAS DE USO */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name="nivel_uso"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nível de uso</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder="Selecione o nivel de uso" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="infrequentemente">Infrequentemente</SelectItem>
                          <SelectItem value="2x_semana">2x por semana</SelectItem>
                          <SelectItem value="4x_semana">4x por semana</SelectItem>
                          <SelectItem value="todos_dias">Todos os dias</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="horas_uso"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horas de uso</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder="Selecione as horas de uso" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="menos_1_hora">Menos de 1 hora</SelectItem>
                          <SelectItem value="1_hora">1 hora</SelectItem>
                          <SelectItem value="2_horas">2 horas</SelectItem>
                          <SelectItem value="4_horas">4 horas</SelectItem>
                          <SelectItem value="6_horas">6 horas</SelectItem>
                          <SelectItem value="mais_6_horas">Mais de 6 horas</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>


              <Button className='w-full mt-4 hover:opacity-90 cursor-pointer'>
                Analisar os meus hábitos de uso
              </Button>

            </form>

          </Form>

        </div>
      </Card>
    </div>
  )
}