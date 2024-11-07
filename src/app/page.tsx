import { Visualizer } from "../components/Visualizer";
import type { Company } from "@/app/types/types";
import { getCompanies, API_URL } from "@/app/utils/apiUtils";

export default async function Home() {
  const companies: Company[] = await getCompanies(API_URL);

  return (
    <div className="overflow-y-hidde">
      <Visualizer data={companies} />
    </div>
  );
}
