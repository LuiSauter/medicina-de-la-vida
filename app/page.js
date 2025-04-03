"use client"
import { IoIosPlay } from "react-icons/io";
import countryCodes from '@/data/country-code.json'
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ArrowRight, Award, BookOpen, CheckCheckIcon, ChevronsUpDownIcon, CircleCheckBig, CrossIcon, Eye, Globe, Heart, Loader, MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PhoneInput } from "@/components/ui/phone-input";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Este campo es obligatorio",
  }),
  email: z.string().email("Este campo debe ser un email válido"),
  phone: z.string().min(1, {
    message: "Este campo es obligatorio",
  }),
})

export default function Home() {

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      // countryCode: "+54",
    },
  })

  function onSubmit(data) {
    // toast({
    //   title: "¡Gracias por registrarte!",
    //   description: "Recibirás un correo con el enlace para ver la clase.",
    // })
    console.log(data)
  }

  return (
    <>
      {/* hero */}
      <section className="flex flex-col px-4 py-8 gap-8">
        <div className="flex flex-col gap-4">

          <div className='flex items-center gap-2 bg-primary/20 w-fit px-4 py-0.5 rounded-xl'>
            <IoIosPlay />
            <span className="text-sm">Clase gratuita de 10 minutos</span>
          </div>
          <div>
            <h1 className="text-primary text-2xl font-extrabold leading-8">
              Aplica un método que mejora la <span className="text-secondary">salud real</span> de tus pacientes
            </h1>
          </div>
          <div>
            <h2 className="text-primary text-sm">
              <span className="font-bold">Dra. Idoia Álvarez</span> | Fundadora del International Lifestyle Institute
            </h2>
          </div>

        </div>

        <div className="flex flex-col">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 shadow-md rounded-lg">
              <h2 className="text-primary font-semibold">Regístrate para ver la clase</h2>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-primary'>Nombre completo*</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu nombre y apellido" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-primary'>Email*</FormLabel>
                    <FormControl>
                      <Input placeholder="tucorreo@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-primary'>Número de teléfono*</FormLabel>
                    <FormControl>
                      <PhoneInput
                        className="rounded-lg"
                        placeholder="Tu número de teléfono"
                        onChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className='rounded-lg py-5'>Ver la clase ahora</Button>
              <FormDescription>
                Al registrarte, aceptas recibir comunicaciones relacionadas con esta clase. Tus datos están seguros y protegidos.
              </FormDescription>
            </form>
          </Form>
        </div>
      </section>
      {/* ¿A QUIÉN ESTÁ DIRIGIDA ESTA CLASE? */}
      <section className="flex flex-col px-4 py-8 gap-4">
        <h2 className="text-primary font-bold text-lg">¿A QUIÉN ESTÁ DIRIGIDA ESTA CLASE?</h2>
        <p className="text-base">
          Una oportunidad para transformar tu práctica profesional
        </p>
        <h3 className="text-primary font-semibold">
          Esta clase es para ti si:
        </h3>
        <div className="flex flex-col gap-5">
          <article className="flex flex-col gap-4 p-5 shadow-md rounded-xl">
            <div className="justify-start flex">
              <div className="bg-primary/20 rounded-full flex items-center justify-center w-14 h-14 shrink">
                <BookOpen className="text-primary" />
              </div>
            </div>
            <h3 className="text-primary text-lg font-semibold">Enfoque preventivo</h3>
            <p className="text-base text-gray-600">
              Buscas actualizarte con un enfoque preventivo y basado en evidencia científica actual
            </p>
          </article>

          <article className="flex flex-col gap-4 p-5 shadow-md rounded-xl">
            <div className="justify-start flex">
              <div className="bg-primary/20 rounded-full flex items-center justify-center w-14 h-14 shrink">
                <Eye className="text-primary" />
              </div>
            </div>
            <h3 className="text-primary text-lg font-semibold">Visión integradora</h3>
            <p className="text-base text-gray-600">
              Sabes que la atención centrada únicamente en el síntoma ya no es suficiente
            </p>
          </article>

          <article className="flex flex-col gap-4 p-5 shadow-md rounded-xl">
            <div className="justify-start flex">
              <div className="bg-primary/20 rounded-full flex items-center justify-center w-14 h-14 shrink">
                <MessageCircle className="text-primary" />
              </div>
            </div>
            <h3 className="text-primary text-lg font-semibold">Herramientas prácticas</h3>
            <p className="text-base text-gray-600">
              Quieres herramientas clínicas prácticas para acompañar mejor a tus pacientes
            </p>
          </article>

          <article className="flex flex-col gap-4 p-5 shadow-md rounded-xl">
            <div className="justify-start flex">
              <div className="bg-primary/20 rounded-full flex items-center justify-center w-14 h-14 shrink">
                <Award className="text-primary" />
              </div>
            </div>
            <h3 className="text-primary text-lg font-semibold">Diferenciación profesional</h3>
            <p className="text-base text-gray-600">
              Deseas diferenciarte profesionalmente y liderar desde una visión más integradora
            </p>
          </article>
        </div>
      </section>
      {/*   Ver la clase gratuita ahora */}
      <section className="flex flex-col px-4 py-8 gap-4">
        <Button className='flex items-center gap-2 bg-primary text-white rounded-xl py-6'>
          <IoIosPlay />
          Ver la clase gratuita ahora
        </Button>
        <p className="text-center text-gray-600">10 minutos que transforman tu práctica profesional</p>
      </section>
      {/* ¿POR QUE EL MODELO ACTUAL YA NO ALCANZA? */}
      <section className="flex flex-col px-4 py-8 gap-4">
        <h2 className="text-primary font-bold text-lg">¿POR QUE EL MODELO ACTUAL YA NO ALCANZA?</h2>
        <p className="text-base">
          La atención convencional ha salvado vidas, pero hoy no da respuestas completas frente a:
        </p>
        <div className="flex flex-col gap-4">
          <Image
            src="/doc.svg"
            alt="limitaciones del enfoque actual - Medicina de la Vida"
            width={200}
            height={200}
            className="mx-auto"
            priority
            quality={100}
          />
          <div className="flex flex-col gap-4">
            <h3 className="text-primary text-lg font-semibold">
              Limitaciones del enfoque actual
            </h3>
            <p className="text-base text-gray-600">
              La atención convencional ha salvado vidas, pero hoy no da respuestas completas frente a los desafíos modernos.
            </p>
            <div className="flex items-start justify-start gap-3">
              <X className="text-primary bg-primary/20 p-1 rounded-full mt-1 shrink-0" />
              <p className="text-gray-600">
                Enfermedades crónicas de base multifactorial
              </p>
            </div>
            <div className="flex items-start justify-start gap-3">
              <X className="text-primary bg-primary/20 p-1 rounded-full mt-1 shrink-0" />
              <p className="text-gray-600">
                Pacientes que no mejoran, aunque cumplan el tratamiento
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <Image
            src="/enferma.svg"
            alt="limitaciones del enfoque actual - Medicina de la Vida"
            width={200}
            height={200}
            className="mx-auto"
            priority
            quality={100}
          />
          <div className="flex flex-col gap-4">
            <h3 className="text-primary text-lg font-semibold">
              Síntomas sin soluciones reales
            </h3>
            <p className="text-base text-gray-600">
              El enfoque centrado solo en síntomas deja a muchos pacientes sin respuestas efectivas a largo plazo.
            </p>
            <div className="flex items-start justify-start gap-3">
              <X className="text-primary bg-primary/20 p-1 rounded-full mt-1 shrink-0" />
              <p className="text-gray-600">
                Malestar persistente sin diagnóstico claro
              </p>
            </div>
            <div className="flex items-start justify-start gap-3">
              <X className="text-primary bg-primary/20 p-1 rounded-full mt-1 shrink-0" />
              <p className="text-gray-600">
                Fatiga, ansiedad, insomnio, inflamación, burnout
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-4 border rounded-lg shadow-lg p-4">
          <p className="text-base text-primary font-semibold">
            Y tú, como profesional, mereces herramientas para ir más allá de este modelo limitado.
          </p>
          <Button className='w-full flex items-center gap-2 bg-primary text-white rounded-xl py-6'>
            Ver la clase ahora
            <ArrowRight />
          </Button>
        </div>

      </section>
      {/* LO QUE APRENDERÁS EN ESTA CLASE */}
      <section className="flex flex-col px-4 py-8 gap-4">
        <h2 className="text-primary font-bold text-lg">
          LO QUE APRENDERÁS EN ESTA CLASE
        </h2>
        <div className="flex flex-col gap-5">
          <article className="flex flex-col gap-4 p-5 shadow-md rounded-xl">
            <div className="justify-start flex">
              <div className="bg-primary/20 rounded-full flex items-center justify-center w-14 h-14 shrink">
                <Globe className="text-primary" />
              </div>
            </div>
            <h3 className="text-primary text-lg font-semibold">Enfoque médico innovador</h3>
            <p className="text-base text-gray-600">
              Qué es el enfoque médico que ya están aplicando miles de profesionales en el mundo y cómo está cambiando la práctica clínica tradicional.
            </p>
            <div className="bg-primary w-1/3 h-1.5 shrink-0" />
          </article>

          <article className="flex flex-col gap-4 p-5 shadow-md rounded-xl">
            <div className="justify-start flex">
              <div className="bg-primary/20 rounded-full flex items-center justify-center w-14 h-14 shrink">
                <CircleCheckBig className="text-primary" />
              </div>
            </div>
            <h3 className="text-primary text-lg font-semibold">Integración práctica</h3>
            <p className="text-base text-gray-600">
              Cómo abordarlo desde tu práctica actual sin dejar tu especialidad, con herramientas que puedes implementar desde el primer día.
            </p>
            <div className="bg-primary w-1/3 h-1.5 shrink-0" />
          </article>

          <article className="flex flex-col gap-4 p-5 shadow-md rounded-xl">
            <div className="justify-start flex">
              <div className="bg-primary/20 rounded-full flex items-center justify-center w-14 h-14 shrink">
                <ArrowRight className="text-primary" />
              </div>
            </div>
            <h3 className="text-primary text-lg font-semibold">Resultados sostenibles</h3>
            <p className="text-base text-gray-600">
              Cómo lograr resultados clínicos más sostenibles, visibles y profundos con un enfoque basado en evidencia científica.
            </p>
            <div className="bg-primary w-1/3 h-1.5 shrink-0" />
          </article>

          <article className="flex flex-col gap-4 p-5 shadow-md rounded-xl bg-primary">
            <div className="justify-start flex">
              <div className="bg-white/20 rounded-full flex items-center justify-center w-14 h-14 shrink">
                <Heart stroke="white" fill="white" />
              </div>
            </div>
            <h3 className="text-white text-lg font-bold">El paso siguiente para ejercer con más impacto y rigor</h3>
            <p className="text-base text-white">
              Por qué integrar hábitos y estilo de vida no es alternativo, sino esencial para la medicina del futuro. Descubre cómo este enfoque está transformando la práctica clínica a nivel mundial.
            </p>
            <Button className='flex items-center gap-2 bg-white/20 text-white rounded-lg py-6 justify-center'>
              <IoIosPlay className="text-primary scale-150" />
              Incluido en la clase gratuita
            </Button>
          </article>
        </div>
      </section>
      {/* sobre idoia */}
      <section className="flex flex-col px-4 py-8 gap-4">
        <div className="flex flex-col gap-4 bg-slate-100 rounded-2xl px-5 py-6">
          <figure className="flex items-center justify-center m-5 p-0 overflow-hidden">
            <Image
              src="/dra-idoia-alvarez.svg"
              alt="Dra. Idoia Álvarez - Medicina de la Vida"
              width={200}
              height={200}
              className="mx-auto"
              priority
              quality={100}
            />
          </figure>
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-bold text-primary">SOBRE LA DRA. IDOIA ÁLVAREZ</h2>
            <div className="flex items-start justify-start gap-4">
              <div className="bg-primary/10 rounded-full flex items-center justify-center w-12 h-12 shrink-0">
                <Globe className="text-primary" size={20} />
              </div>
              <p className="text-gray-600">
                Certificada en Medicina del Estilo de Vida
              </p>
            </div>
            <div className="flex items-start justify-start gap-4">
              <div className="bg-primary/10 rounded-full flex items-center justify-center w-12 h-12 shrink-0">
                <Loader className="text-primary" size={20} />
              </div>
              <p className="text-gray-600">
                Experiencia en el sistema sanitario de España y Nueva Zelanda
              </p>
            </div>
            <div className="flex items-start justify-start gap-4 relative border-l-4 border-secondary">
              <p className="text-gray-500 pl-4 italic">
                &quot;Esta clase es para profesionales que quieren avanzar hacia una medicina más eficaz, humana y científicamente sólida.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col px-4 py-8 gap-5">
        <h2 className="text-primary font-bold text-lg">
          TRAYECTORIA
        </h2>
        <article className="flex flex-col gap-4 border-b-2 border-primary/20 pb-5">
          <div className="justify-start flex">
            <div className="bg-primary rounded-full flex items-center justify-center w-20 h-20 shrink">
              <Image
                src='/International-Lifestyle-Institute-logo-footer.svg'
                alt="International Lifestyle Institute | Medicina de la Vida"
                width={100}
                height={100}
                className="mx-auto h-full w-full p-1"
                priority
                quality={100}
              />
            </div>
          </div>
          <h3 className="text-primary text-lg font-semibold">
            Fundadora con propósito
          </h3>
          <p className="text-base text-gray-600">
            La Dra. Idoia Álvarez fundó el International Lifestyle Institute para ayudar a profesionales de la salud a integrar este enfoque con base científica, de forma clínica, rigurosa y aplicable.
          </p>
        </article>
        <article className="flex flex-col gap-4 border-b-2 border-primary/20 pb-5">
          <div className="justify-start flex">
            <div className="bg-primary rounded-full flex items-center justify-center w-20 h-20 shrink">
              <Image
                src='/consejo-cientifico.svg'
                alt="Consejo Científico del Instituto Español de Medicina del Estilo de Vida"
                width={90}
                height={90}
                className="mx-auto h-[70%] w-[70%] p-1"
                priority
                quality={100}
              />
            </div>
          </div>
          <h3 className="text-primary text-lg font-semibold">
            Consejo Científico
          </h3>
          <p className="text-base text-gray-600">
            Es miembro del Consejo Científico del Instituto Español de Medicina del Estilo de Vida, una organización de referencia en el mundo hispanohablante para la difusión y formación en este enfoque clínico.
          </p>
        </article>
        <article className="flex flex-col gap-4">
          <div className="justify-start flex">
            <div className="bg-primary rounded-full flex items-center justify-center w-20 h-20 shrink">
              <Image
                src='/reconocimiento-internacional.svg'
                alt="Reconocimiento internacional"
                width={90}
                height={900}
                className="mx-auto h-[70%] w-[70%] p-1"
                priority
                quality={100}
              />
            </div>
          </div>
          <h3 className="text-primary text-lg font-semibold">
            Reconocimiento internacional
          </h3>
          <p className="text-base text-gray-600">
            También forma parte de la Australian Society of Lifestyle Medicine, una de las sociedades pioneras a nivel internacional en investigación y aplicación de este modelo.
          </p>
        </article>
      </section>
      <section className="flex flex-col px-4 py-8 gap-4">
        <h2 className="text-primary font-bold text-lg">
          RESPUESTAS A DUDAS COMUNES
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>¿Esto es solo para médicos?</AccordionTrigger>
            <AccordionContent>
              No. La clase está dirigida a cualquier profesional de la salud con interés en intervenir desde la raíz del problema: nutricionistas, psicólogos, fisioterapeutas, enfermeros, coaches certificados…
              Si trabajas acompañando procesos de salud, este enfoque es aplicable y valioso para ti.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>¿Es muy técnico o difícil de seguir?</AccordionTrigger>
            <AccordionContent>
              No, esta clase está diseñada para profesionales que quieren una base científica clara, sin tecnicismos innecesarios.
              Tanto si tienes experiencia clínica como si vienes de otras disciplinas de la salud, lo entenderás y te resultará útil desde el primer minuto.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>¿Vale la pena si ya tengo formación o experiencia?</AccordionTrigger>
            <AccordionContent>
              Sí, especialmente si ya cuentas con una base clínica o terapéutica sólida.
              Este enfoque no pretende reemplazar lo que ya sabes, sino ofrecerte una estructura actualizada y basada en evidencia para integrar el estilo de vida como una variable clínica más.
              <div className="pt-2">
                Muchos profesionales con años de experiencia lo integran para dar respuesta a aquello que la formación tradicional no abordó del todo: la raíz multifactorial de muchos síntomas, y la necesidad de intervenir sobre el contexto de vida del paciente con la misma seriedad con la que tratamos una analítica.
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>¿Puedo aplicar esto si trabajo online?</AccordionTrigger>
            <AccordionContent>
              Sí. Este enfoque es flexible y se adapta tanto a consulta presencial como online. De hecho, cada vez más profesionales lo integran en sus programas digitales o sesiones individuales a distancia.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>¿Y si no soy sanitario titulado?</AccordionTrigger>
            <AccordionContent>
              Esta clase está pensada especialmente para profesionales sanitarios y coaches certificados.
              Si tu trabajo tiene base en la salud y la prevención, y buscas aplicar un modelo serio y con evidencia, te va a servir.
              Eso sí, siempre dentro de los límites legales y éticos de tu rol profesional.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger> ¿Es una corriente alternativa?</AccordionTrigger>
            <AccordionContent>
              No. La Medicina del Estilo de Vida es un enfoque clínico reconocido, respaldado por universidades y sociedades médicas de referencia a nivel internacional.
              No sustituye la medicina convencional, la complementa y la actualiza.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <section className="flex flex-col px-4 py-8 gap-4"></section>
      <section className="flex flex-col px-4 py-8 gap-4"></section>
      <section className="flex flex-col px-4 py-8 gap-4"></section>
      <section className="flex flex-col px-4 py-8 gap-4"></section>
      <section className="flex flex-col px-4 py-8 gap-4"></section>
      <section className="flex flex-col px-4 py-8 gap-4"></section>
      <section className="flex flex-col px-4 py-8 gap-4"></section>
    </>
  );
}
