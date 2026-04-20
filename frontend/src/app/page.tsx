"use client";
import { useState } from 'react'
import { HabitAnalysisForm } from "./_components/habit-analysis-form";
import { HabitAnalysisGenerator } from './_components/habit-analysis-generator';
import { HabitAnalysisData } from '@/types/habit-analysis-data.type';



export default function Home() {
  const [data, setData] = useState<HabitAnalysisData | null>(null)

  function handleSubmit(userInfo: HabitAnalysisData) {
    setData(userInfo)
  }

  return (
    <>
      {!data ? (
        <HabitAnalysisForm onSubmit={handleSubmit} />
      ) : (
        <HabitAnalysisGenerator data={data} />
      )}
    </>
  );
}
