import { Company } from "../types/types";

export async function getCompanies(): Promise<Company[]> {
  const res = await fetch("https://fake-api.tractian.com/companies", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}
