/** @deprecated Usar `@/content/landing` */
export { contact, nav, site, testimonials } from "@/content/landing";

import { contact, site } from "@/content/landing";

export const WHATSAPP_NUMBER = site.whatsappNumber;
export const PBX = site.phone;
export const PBX_TEL = site.phoneTel;
export const FACEBOOK_URL = site.facebook;
export const WHATSAPP = site.whatsapp;
export const WHATSAPP_POS = site.whatsappPos;
export const navLinks = [...nav];
export const serviceOptions = [...contact.serviceOptions];
