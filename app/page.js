'use client'
import { Loader } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect } from "react";


export default function Home() {

  useEffect(() => {
    setTimeout(() => {
      redirect('/clase-gratuita-mev.html')
    }, 5)
  }, [])

  return (
    <section className="grid place-content-center px-4 pt-6 md:pt-0 md:pb-0 gap-8 relative md:flex-row md:px-16 min-h-[calc(100dvh-72px)] md:min-h-[calc(100dvh-72px-143.58px)] w-full">
      <Loader  className="animate-spin h-9 w-9 text-primary" />
    </section>
  )
}
