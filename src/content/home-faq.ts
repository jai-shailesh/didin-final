import { project } from "./project";

export const homeFaqs = [
  {
    q: "Who is Didin Dileep?",
    a: "Didin Dileep is the founder of Triad Realty in Dubai. He works as a property investment strategist, helping private and corporate investors review luxury and commercial property in Dubai using sourced numbers.",
  },
  {
    q: "What does Didin help investors with?",
    a: "He helps you clarify your goal (own use, rental income or capital growth), compare launches on the same numbers, check the payment plan, total cost and risks for a specific unit, and complete registration through the developer's official channel.",
  },
  {
    q: "Is this the official website of a developer?",
    a: "No. This is Didin Dileep's own website. Projects are developed and sold by their developers and sales agents, and bookings are completed through the developer's official channel.",
  },
  {
    q: "Which project is Didin briefing investors on now?",
    a: `${project.name} on Sheikh Zayed Road, Dubai: ${project.floors} floors, ${project.offices} Grade A freehold offices, developed by ${project.developer}. Expressions of interest open on ${project.eoi.opensLabel}. The brochure and price list are on the project page.`,
  },
  {
    q: "What happens after I send my number?",
    a: "Didin messages you on WhatsApp, usually within minutes during working hours, with the information you asked for. If it suits you, he then arranges a short call to understand your goals and budget. There is no obligation.",
  },
];
