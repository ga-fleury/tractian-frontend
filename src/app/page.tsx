import { Header } from "../components/Header";
import { Visualizer } from "../components/Visualizer";
import type { Company } from "@/app/types/types";
import { getCompanies } from "./services/companyService";

export default async function Home() {
  const companies: Company[] = await getCompanies();

  return (
    <div className="overflow-y-hidde">
      <Visualizer data={companies} />
    </div>
  );
}
