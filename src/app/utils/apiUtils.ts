import { Company, Asset } from "../types/types";

export const API_URL: string = "https://fake-api.tractian.com/companies";

export async function getCompanies(url: string): Promise<Company[]> {
  const res = await fetch(url, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

export async function getDataFromApi(
  companyId: string,
  dir: string
): Promise<Asset[]> {
  const res = await fetch(
    `https://fake-api.tractian.com/companies/${companyId}/${dir}`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}
