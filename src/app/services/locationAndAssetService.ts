import { Company, Asset } from "../types/types";

export async function getLocations(companyId: string): Promise<Company[]> {
  const res = await fetch(
    `https://fake-api.tractian.com/companies/${companyId}/locations`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

export async function getAssets(companyId: string): Promise<Asset[]> {
  const res = await fetch(
    `https://fake-api.tractian.com/companies/${companyId}/assets`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}
