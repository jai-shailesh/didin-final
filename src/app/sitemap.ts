import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { project } from "@/content/project";

const lastModified = new Date("2026-10-26");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/${project.slug}`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/services`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/case-studies`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/contact`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/disclaimer`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
