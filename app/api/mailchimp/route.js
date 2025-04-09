import { NextResponse } from "next/server"

export async function POST(req) {
  const { name, email, phone } = await req.json()

  const params = new URLSearchParams({
    u: "36b822a64921a59ff44bdd210",
    id: "88b2fe7b65",
    EMAIL: email,
    NAME: name,
    JOB: phone,
  })

  const res = await fetch("https://ilifestylei.us13.list-manage.com/subscribe/post-json?" + params.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const text = await res.text()

  // Mailchimp responde con JSONP (sí, aún viven en 2009)
  if (text.includes("error")) {
    return NextResponse.json({ success: false, message: "Error al registrarse" }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
