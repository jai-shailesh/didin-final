import { project } from "@/content/project";

const fmt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
export const aed = (n: number) => fmt.format(Math.round(n));
export const aedShort = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 1 : 2).replace(/\.?0+$/, "")}M` : aed(n);
export const pct = (n: number, d = 1) => `${n.toFixed(d)}%`;

export function acquisition(sqft: number, psf: number) {
  const price = sqft * psf;
  const dld = price * project.dldRate;
  const vat = price * project.vatRate;
  return { price, dld, vat, total: price + dld + vat };
}

export function yieldModel(opts: { sqft: number; psf: number; rentPsf: number; vacancyPct: number }) {
  const a = acquisition(opts.sqft, opts.psf);
  const grossRent = opts.sqft * opts.rentPsf;
  const vacancyLoss = grossRent * (opts.vacancyPct / 100);
  const service = opts.sqft * project.serviceChargePsf;
  const net = grossRent - vacancyLoss - service;
  return {
    ...a,
    grossRent,
    vacancyLoss,
    service,
    net,
    grossYield: (grossRent / a.total) * 100,
    netYield: (net / a.total) * 100,
  };
}

export const ENTRY_UNIT_SQFT = 1077;
