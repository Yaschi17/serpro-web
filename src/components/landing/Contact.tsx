"use client";

import { useState } from "react";
import { Facebook, MessageCircle, PhoneCall, Send } from "lucide-react";
import { contact, site } from "@/content/landing";
import { Card, Section, SectionHeader } from "@/components/landing/ui";

export function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(contact.serviceOptions[0]);
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = [
      "Hola SerPro Technology,",
      "",
      `Nombre: ${name}`,
      `Teléfono: ${phone}`,
      `Servicio de interés: ${service}`,
      "",
      message || "Me gustaría recibir más información.",
    ].join("\n");
    window.open(
      `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <Section id="contacto" scene="contact">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <SectionHeader label={contact.label} title={contact.title} description={contact.description} />

          <div className="mt-8 space-y-3">
            <a href={`tel:${site.phoneTel}`} className="card flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/15">
                <PhoneCall className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">PBX</p>
                <p className="text-sm font-semibold">{site.phone}</p>
              </div>
            </a>

            <a href={site.whatsapp} target="_blank" rel="noreferrer" className="card flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#25D366]/15">
                <MessageCircle className="h-5 w-5 text-[#25D366]" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">WhatsApp</p>
                <p className="text-sm font-semibold">+502 {site.phone}</p>
              </div>
            </a>

            <a href={site.facebook} target="_blank" rel="noreferrer" className="card flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#1877F2]/15">
                <Facebook className="h-5 w-5 text-[#1877F2]" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Facebook</p>
                <p className="text-sm font-semibold">{site.name}</p>
              </div>
            </a>
          </div>
        </div>

        <Card className="p-8">
          <h3 className="text-lg font-semibold">Formulario de consulta</h3>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="field-label">
                  Nombre completo
                </label>
                <input
                  id="name"
                  className="input"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Su nombre"
                />
              </div>
              <div>
                <label htmlFor="phone" className="field-label">
                  Teléfono
                </label>
                <input
                  id="phone"
                  className="input"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0000-0000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="service" className="field-label">
                Servicio de interés
              </label>
              <select
                id="service"
                className="input"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                {contact.serviceOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="field-label">
                Mensaje
              </label>
              <textarea
                id="message"
                className="input textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Cuéntenos sobre su proyecto o consulta..."
              />
            </div>

            <button type="submit" className="btn-primary w-full sm:w-auto">
              <Send className="h-4 w-4" />
              Enviar consulta por WhatsApp
            </button>
            <p className="text-xs text-muted-foreground">{contact.formNote}</p>
          </form>
        </Card>
      </div>
    </Section>
  );
}
