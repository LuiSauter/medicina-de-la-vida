"use client"
import { IoIosPlay } from "react-icons/io";
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

import { ArrowRight, Award, BookOpen, CircleCheckBig, Clock, Eye, Globe, Heart, Loader, MessageCircle, X } from "lucide-react";
import { PhoneInput } from "@/components/ui/phone-input";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import MailchimpSubscribe from "react-mailchimp-subscribe";

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Este campo es obligatorio",
  }),
  email: z.string().email("Este campo debe ser un email válido"),
  phone: z.string().min(1, {
    message: "Este campo es obligatorio",
  }),
})

const CustomForm = ({ status, message, onValidated }) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const submitForm = (data) => {
    onValidated({
      NAME: data.name,
      EMAIL: data.email,
      JOB: data.phone,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)} className="flex flex-col gap-4 p-4 shadow-md rounded-lg bg-white md:max-w-md">
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

        {status === "sending" && <p className="text-blue-500 text-sm">Enviando...</p>}
        {status === "error" && <p className="text-red-500 text-sm" dangerouslySetInnerHTML={{ __html: message }} />}
        {status === "success" && <p className="text-green-600 text-sm" dangerouslySetInnerHTML={{ __html: message }} />}

        <Button type="submit" className='rounded-lg py-5'>Ver la clase ahora</Button>

        <FormDescription>
          Al registrarte, aceptas recibir comunicaciones relacionadas con esta clase. Tus datos están seguros y protegidos.
        </FormDescription>
      </form>
    </Form>
  );
};

export default function Home() {
  const url = "https://ilifestylei.us13.list-manage.com/subscribe/post?u=36b822a64921a59ff44bdd210&id=88b2fe7b65&f_id=0016ece7f0";
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  async function onSubmit(data) {
    const formData = new FormData();
    formData.append("EMAIL", data.email);
    formData.append("NAME", data.name);
    formData.append("JOB", data.phone); // Este es el campo de teléfono
    formData.append("u", "36b822a64921a59ff44bdd210");
    formData.append("id", "88b2fe7b65");
    formData.append("f_id", "0016ece7f0");

    try {
      redirect("/clase-gratuita")
    } catch (error) {
      toast.error("Ocurrió un error al enviar el formulario.");
      console.error("Error al enviar a Mailchimp:", error);
    }
  }

  return (
    <>
      {/* hero */}
      <section className="flex flex-col px-4 pb-10 pt-4 gap-8 relative md:flex-row md:px-16 md:py-16">
        <div className="flex flex-col gap-4 md:justify-center md:max-w-[45%] md:ml-auto">
          <div className='flex items-center gap-2 bg-primary/20 w-fit px-4 py-0.5 rounded-xl'>
            <IoIosPlay />
            <span className="text-sm">Clase gratuita de 10 minutos</span>
          </div>
          <div className="md:max-w-[90%]">
            <h1 className="text-primary text-3xl font-bold leading-7 md:text-5xl md:leading-12">
              Aplica un método que mejora la <span className="text-secondary">salud real</span> de tus pacientes
            </h1>
          </div>
          <div className="relative">
            <h2 className="text-primary text-sm md:text-xl">
              <span className="font-bold">Dra. Idoia Álvarez</span> | Fundadora del International Lifestyle Institute
            </h2>
          </div>
        </div>
        <div className="w-[100%] h-[50%] bg-[#02ACC4] absolute inset-0 mx-auto my-[10%] blur-3xl opacity-15 z-[-1] md:h-[70%]"></div>

        <div className="flex flex-col md:mr-auto">
          <MailchimpSubscribe
            url={"https://ilifestylei.us13.list-manage.com/subscribe/post?u=36b822a64921a59ff44bdd210&id=88b2fe7b65&f_id=0016ece7f0"}
            render={({ subscribe, status, message }) => {
              if (status === "success") {
                toast.success("¡Gracias por registrarte! Revisa tu email.");
                redirect("/clase-gratuita.html")
              }
              return (
                <CustomForm
                  status={status}
                  message={message}
                  onValidated={(formData) => subscribe(formData)}
                />
              )
            }}
          />
          {/* <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 shadow-md rounded-lg bg-white md:max-w-md">
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
          </Form> */}
        </div>
      </section>
      {/* ¿A QUIÉN ESTÁ DIRIGIDA ESTA CLASE? */}
      <section className="flex flex-col px-4 py-10 gap-4 md:px-15 md:py-16 md:justify-center">
        <div className="flex flex-col gap-4 md:justify-center md:max-w-lg md:mx-auto md:text-center">
          <h2 className="text-primary font-bold text-lg md:text-2xl">¿A QUIÉN ESTÁ DIRIGIDA ESTA CLASE?</h2>
          <p className="text-base md:text-lg">
            Una oportunidad para transformar tu práctica profesional
          </p>
          <h3 className="text-primary font-semibold md:text-lg">
            Esta clase es para ti si:
          </h3>
        </div>
        <div className="flex flex-col gap-5 md:flex-row md:gap-8 md:justify-center md:grid md:grid-cols-2 md:max-w-5xl md:mx-auto">
          <article className="flex flex-col gap-4 p-5 shadow-md rounded-xl hover:shadow-xl transition-all hover:scale-[1.005] md:p-8">
            <div className="justify-start flex">
              <div className="bg-primary/20 rounded-full flex items-center justify-center w-14 h-14 shrink">
                <BookOpen className="text-primary" />
              </div>
            </div>
            <h3 className="text-primary text-lg font-semibold md:text-xl">Enfoque preventivo</h3>
            <p className="text-base text-gray-600 md:text-lg">
              Buscas actualizarte con un enfoque preventivo y basado en evidencia científica actual
            </p>
          </article>

          <article className="flex flex-col gap-4 p-5 shadow-md rounded-xl hover:shadow-xl transition-all hover:scale-[1.005] md:p-8">
            <div className="justify-start flex">
              <div className="bg-primary/20 rounded-full flex items-center justify-center w-14 h-14 shrink">
                <Eye className="text-primary" />
              </div>
            </div>
            <h3 className="text-primary text-lg font-semibold md:text-xl">Visión integradora</h3>
            <p className="text-base text-gray-600 md:text-lg">
              Sabes que la atención centrada únicamente en el síntoma ya no es suficiente
            </p>
          </article>

          <article className="flex flex-col gap-4 p-5 shadow-md rounded-xl hover:shadow-xl transition-all hover:scale-[1.005] md:p-8">
            <div className="justify-start flex">
              <div className="bg-primary/20 rounded-full flex items-center justify-center w-14 h-14 shrink">
                <MessageCircle className="text-primary" />
              </div>
            </div>
            <h3 className="text-primary text-lg font-semibold md:text-xl">Herramientas prácticas</h3>
            <p className="text-base text-gray-600 md:text-lg">
              Quieres herramientas clínicas prácticas para acompañar mejor a tus pacientes
            </p>
          </article>

          <article className="flex flex-col gap-4 p-5 shadow-md rounded-xl hover:shadow-xl transition-all hover:scale-[1.005] md:p-8">
            <div className="justify-start flex">
              <div className="bg-primary/20 rounded-full flex items-center justify-center w-14 h-14 shrink">
                <Award className="text-primary" />
              </div>
            </div>
            <h3 className="text-primary text-lg font-semibold md:text-xl">Diferenciación profesional</h3>
            <p className="text-base text-gray-600 md:text-lg">
              Deseas diferenciarte profesionalmente y liderar desde una visión más integradora
            </p>
          </article>
        </div>
      </section>
      {/*   Ver la clase gratuita ahora */}
      <section className="flex flex-col px-4 py-10 gap-4 relative overflow-hidden md:px-15 md:py-16">
        <Button className='flex items-center gap-2 bg-primary text-white rounded-xl py-6 md:text-lg md:max-w-fit md:mx-auto'>
          <div className="md:px-8 flex items-center gap-2">
            <IoIosPlay />
            Ver la clase gratuita ahora
          </div>
        </Button>
        <p className="text-center text-gray-600 md:text-lg">10 minutos que transforman tu práctica profesional</p>
        <div className="w-[100%] h-[50%] bg-[#02ACC4] absolute inset-0 mx-auto my-auto blur-3xl opacity-35 z-[-1]"></div>
      </section>
      {/* ¿POR QUE EL MODELO ACTUAL YA NO ALCANZA? */}
      <section className="flex flex-col px-4 py-10 gap-4 bg-slate-50 relative md:px-15 md:py-16 md:gap-8 md:items-center">
        <h2 className="text-primary font-bold text-lg md:text-2xl text-center">
          ¿POR QUE EL MODELO ACTUAL YA NO ES SUFICIENTE?
        </h2>
        <p className="text-base text-gray-600 text-center md:text-lg">
          La atención convencional ha salvado vidas, pero hoy no da respuestas completas frente a:
        </p>
        <div className="flex flex-col gap-4 md:grid md:grid-cols-[200px_1fr] md:gap-8 md:max-w-2xl md:mx-auto">
          <Image
            src="/doc.svg"
            alt="limitaciones del enfoque actual - Medicina de la Vida"
            width={200}
            height={200}
            className="mx-auto md:h-52 md:w-52"
            priority
            quality={100}
          />
          <div className="flex flex-col gap-4 justify-center w-full">
            <h3 className="text-primary text-lg font-semibold md:text-xl">
              Limitaciones del enfoque actual
            </h3>
            {/* <p className="text-base text-gray-600">
              La atención convencional ha salvado vidas, pero hoy no da respuestas completas frente a los desafíos modernos.
            </p> */}
            <div className="flex items-start justify-start gap-3">
              <X className="text-primary bg-primary/20 p-1 rounded-full mt-1 shrink-0" />
              <p className="text-gray-600 md:text-lg">
                Enfermedades crónicas de base multifactorial
              </p>
            </div>
            <div className="flex items-start justify-start gap-3">
              <X className="text-primary bg-primary/20 p-1 rounded-full mt-1 shrink-0" />
              <p className="text-gray-600 md:text-lg">
                Pacientes que no mejoran, aunque cumplan el tratamiento
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:grid md:grid-cols-[200px_1fr] md:gap-8 md:max-w-2xl md:mx:auto">
          <Image
            src="/enferma.svg"
            alt="limitaciones del enfoque actual - Medicina de la Vida"
            width={200}
            height={200}
            className="mx-auto md:h-52 md:w-52"
            priority
            quality={100}
          />
          <div className="flex flex-col gap-4 justify-center w-full">
            <h3 className="text-primary text-lg font-semibold md:text-xl">
              Síntomas sin soluciones reales
            </h3>
            {/* <p className="text-base text-gray-600">
              El enfoque centrado solo en síntomas deja a muchos pacientes sin respuestas efectivas a largo plazo.
            </p> */}
            <div className="flex items-start justify-start gap-3">
              <X className="text-primary bg-primary/20 p-1 rounded-full mt-1 shrink-0" />
              <p className="text-gray-600 md:text-lg">
                Malestar persistente sin diagnóstico claro
              </p>
            </div>
            <div className="flex items-start justify-start gap-3">
              <X className="text-primary bg-primary/20 p-1 rounded-full mt-1 shrink-0" />
              <p className="text-gray-600 md:text-lg">
                Fatiga, ansiedad, insomnio, inflamación, burnout
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-4 border rounded-lg shadow-lg p-4 bg-white md:max-w-5xl md:mx-auto md:p-8 md:gap-8">
          <p className="text-base text-primary font-semibold md:text-center md:text-lg">
            Y tú, como profesional, mereces herramientas para ir más allá de este modelo limitado.
          </p>
          <Button className='w-full flex items-center gap-2 bg-primary text-white rounded-xl py-6 md:gap-4 md:text-lg'>
            Ver la clase ahora
            <ArrowRight />
          </Button>
        </div>

      </section>
      {/* LO QUE APRENDERÁS EN ESTA CLASE */}
      <section className="flex flex-col px-4 py-10 gap-4 relative md:px-15 md:py-16 md:gap-8 md:items-center">
        <div className="w-[100%] h-[90%] bg-[#02ACC4] absolute inset-0 mx-auto my-auto blur-3xl opacity-15 z-[-1]"></div>
        <h2 className="text-primary font-bold text-lg md:text-2xl text-center">
          LO QUE APRENDERÁS EN ESTA CLASE
        </h2>
        <div className="flex flex-col gap-5 md:grid md:grid-cols-3 md:gap-8 md:max-w-5xl md:mx-auto">
          <article className="bg-white flex flex-col gap-4 p-5 shadow-md rounded-xl md:justify-between md:p-8">
            <div className="justify-start flex">
              <div className="bg-primary/20 rounded-full flex items-center justify-center w-14 h-14 shrink">
                <Globe className="text-primary" />
              </div>
            </div>
            <h3 className="text-primary text-lg font-semibold md:text-xl">Enfoque médico innovador</h3>
            <p className="text-base text-gray-600 md:text-lg">
              Qué es el enfoque médico que ya están aplicando miles de profesionales en el mundo y cómo está cambiando la práctica clínica tradicional.
            </p>
            <div className="bg-primary w-1/3 h-1.5 shrink-0" />
          </article>

          <article className="bg-white flex flex-col gap-4 p-5 shadow-md rounded-xl md:justify-between md:p-8">
            <div className="justify-start flex">
              <div className="bg-primary/20 rounded-full flex items-center justify-center w-14 h-14 shrink">
                <CircleCheckBig className="text-primary" />
              </div>
            </div>
            <h3 className="text-primary text-lg font-semibold md:text-xl">Integración práctica</h3>
            <p className="text-base text-gray-600 md:text-lg">
              Cómo abordarlo desde tu práctica actual sin dejar tu especialidad, con herramientas que puedes implementar desde el primer día.
            </p>
            <div className="bg-primary w-1/3 h-1.5 shrink-0" />
          </article>

          <article className="bg-white flex flex-col gap-4 p-5 shadow-md rounded-xl md:justify-between md:p-8">
            <div className="justify-start flex">
              <div className="bg-primary/20 rounded-full flex items-center justify-center w-14 h-14 shrink">
                <ArrowRight className="text-primary" />
              </div>
            </div>
            <h3 className="text-primary text-lg font-semibold md:text-xl">Resultados sostenibles</h3>
            <p className="text-base text-gray-600 md:text-lg">
              Cómo lograr resultados clínicos más sostenibles, visibles y profundos con un enfoque basado en evidencia científica.
            </p>
            <div className="bg-primary w-1/3 h-1.5 shrink-0" />
          </article>

          <article className="flex flex-col gap-4 p-5 shadow-md rounded-xl bg-primary md:col-span-3 md:justify-between md:p-14 md:gap-6 md:flex-row">
            <div className="justify-start flex">
              <div className="bg-white/20 rounded-full flex items-center justify-center w-14 h-14 shrink">
                <Heart stroke="white" fill="white" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-white text-lg font-bold md:text-3xl">El paso siguiente para ejercer con más impacto y rigor</h3>
              <p className="text-base text-white md:text-lg">
                Por qué integrar hábitos y estilo de vida no es alternativo, sino esencial para la medicina del futuro. Descubre cómo este enfoque está transformando la práctica clínica a nivel mundial.
              </p>
              <Button className='flex items-center gap-2 bg-white/20 text-white rounded-lg py-6 justify-center md:gap-4 md:text-lg md:max-w-fit'>
                <div className="flex items-center gap-2 md:px-4">
                  <IoIosPlay className="text-primary scale-150" />
                  Incluido en la clase gratuita
                </div>
              </Button>
            </div>
          </article>
        </div>
      </section>
      {/* sobre idoia */}
      <section className="flex flex-col px-4 py-10 gap-4 md:px-15 md:py-16 md:gap-8 md:items-center">
        <div className="flex flex-col gap-4 bg-slate-100 rounded-2xl px-5 py-6 md:max-w-5xl md:mx-auto md:px-16 md:py-28 md:flex-row md:gap-14">
          <figure className="flex items-center justify-center m-5 p-0 overflow-hidden md:m-0">
            <Image
              src="/dra-idoia-alvarez.svg"
              alt="Dra. Idoia Álvarez - Medicina de la Vida"
              width={200}
              height={200}
              className="mx-auto md:w-md md:h-md"
              priority
              quality={100}
            />
          </figure>
          <div className="flex flex-col gap-4 md:justify-center md:gap-6">
            <h2 className="text-base font-bold text-primary md:text-2xl">SOBRE LA DRA. IDOIA ÁLVAREZ</h2>
            <div className="flex items-start justify-start gap-4 md:items-center">
              <div className="bg-primary/10 rounded-full flex items-center justify-center w-12 h-12 shrink-0">
                <Globe className="text-primary" size={20} />
              </div>
              <p className="text-gray-600 md:text-xl">
                Certificada en Medicina del Estilo de Vida
              </p>
            </div>
            <div className="flex items-start justify-start gap-4 md:items-center">
              <div className="bg-primary/10 rounded-full flex items-center justify-center w-12 h-12 shrink-0">
                <Loader className="text-primary" size={20} />
              </div>
              <p className="text-gray-600 md:text-lg">
                Experiencia en el sistema sanitario de España y Nueva Zelanda
              </p>
            </div>
            <div className="flex items-start justify-start gap-4 relative border-l-4 border-secondary pl-4 md:items-center">
              <p className="text-gray-500 pl-4 italic md:text-lg">
                &quot;Esta clase es para profesionales que quieren avanzar hacia una medicina más eficaz, humana y científicamente sólida.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* trayectoria */}
      <section className="flex flex-col px-4 py-10 gap-5 md:px-15 md:py-16 md:gap-8 md:items-center">
        <h2 className="text-primary font-bold text-lg md:text-2xl text-center">
          TRAYECTORIA
        </h2>
        <article className="flex flex-col gap-4 border-b-2 border-primary/20 pb-5 md:max-w-5xl md:mx-auto md:flex-row md:gap-6">
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
          <div className="flex flex-col gap-4 md:flex-col">
            <h3 className="text-primary text-lg font-semibold md:text-xl">
              Fundadora con propósito
            </h3>
            <p className="text-base text-gray-600 md:text-lg">
              La Dra. Idoia Álvarez fundó el International Lifestyle Institute para ayudar a profesionales de la salud a integrar este enfoque con base científica, de forma clínica, rigurosa y aplicable.
            </p>
          </div>
        </article>
        <article className="flex flex-col gap-4 border-b-2 border-primary/20 pb-5 md:max-w-5xl md:mx-auto md:flex-row md:gap-6">
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
          <div className="flex flex-col gap-4 md:flex-col">
            <h3 className="text-primary text-lg font-semibold md:text-xl">
              Consejo Científico
            </h3>
            <p className="text-base text-gray-600 md:text-lg">
              Es miembro del Consejo Científico del Instituto Español de Medicina del Estilo de Vida, una organización de referencia en el mundo hispanohablante para la difusión y formación en este enfoque clínico.
            </p>
          </div>
        </article>
        <article className="flex flex-col gap-4 pb-5 md:max-w-5xl md:mx-auto md:flex-row md:gap-6">
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
          <div className="flex flex-col gap-4 md:flex-col">
            <h3 className="text-primary text-lg font-semibold md:text-xl">
              Reconocimiento internacional
            </h3>
            <p className="text-base text-gray-600 md:text-lg">
              También forma parte de la Australasian of Lifestyle Medicine, una de las sociedades pioneras a nivel internacional en investigación y aplicación de este modelo.
            </p>
          </div>
        </article>
      </section>
      {/* respuestas a dudas comunes */}
      <section className="flex flex-col px-4 py-10 gap-4 md:px-15 md:py-16 md:gap-8 md:items-center">
        <h2 className="text-primary font-bold text-lg md:text-2xl text-center">
          RESPUESTAS A DUDAS COMUNES
        </h2>
        <Accordion type="single" collapsible className="w-full md:max-w-5xl">
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
      <section className="flex flex-col px-4 py-10 gap-4 relative md:px-15 md:py-16 md:gap-8 md:items-center">
        <div className="bg-primary/10 rounded-full flex items-center justify-center w-14 h-14 shrink mx-auto">
          <Clock className="text-primary" />
        </div>
        <h2 className="text-primary font-bold text-lg md:text-2xl text-center">
          ¿Listo para dar el siguiente paso?
        </h2>
        <p className="text-base md:text-lg text-gray-600 text-center md:max-w-2xl">
          La clase gratuita de 10 minutos te dará las claves para comenzar a transformar tu práctica profesional.
        </p>
        <Button className='w-full py-6 md:w-fit md:px-10 rounded-xl' variant='outline'>
          ACCEDER AHORA
        </Button>

      </section>
      {/* CTA */}
      <section className="flex flex-col px-4 py-14 gap-4 relative overflow-hidden md:px-15 md:py-16 md:gap-8 md:items-center">
        <div className="w-[100%] h-[90%] bg-[#02ACC4] absolute -top-1/2 mx-auto my-0 blur-3xl opacity-20 z-[-1]"></div>
        <h2 className="font-extrabold text-4xl text-center leading-8 md:max-w-4xl md:mx-auto md:text-5xl md:leading-12">
          Si quieres ejercer con más propósito, evidencia y resultados…
        </h2>
        <h3 className="text-primary text-center text-base font-semibold md:text-xl">
          Esta clase es para ti</h3>
        <div className="bg-white flex flex-col gap-4 mt-4 border rounded-lg shadow-lg p-5 md:max-w-5xl md:mx-auto md:p-8 md:gap-8 md:px-16">
          <p className="text-base text-primary text-center md:text-xl">
            No te pedimos que cambies tu profesión.
          </p>
          <p className="text-center font-bold text-base md:text-2xl">Solo que la lleves al siguiente nivel.</p>
          <Button className='w-full flex items-center gap-2 bg-primary text-white rounded-xl py-6 md:text-lg md:w-fit md:mx-auto'>
            <div className="flex items-center gap-2 md:px-4">
              Ver la clase ahora
              <ArrowRight />
            </div>
          </Button>
        </div>
      </section>
    </>
  );
}
