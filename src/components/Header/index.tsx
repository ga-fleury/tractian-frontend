import { CompanyButton } from "./CompanyButton";
import type { Company } from "@/app/types/types";

interface Props {
  data: Company[];
  currentCompany: Company;
  onButtonClick: (data: Company) => void;
}

export function Header({ data, currentCompany, onButtonClick }: Props) {
  return (
    <header className="bg-[#15172a] h-[50px] flex place-content-between items-center px-8">
      <div>TRACTIAN</div>
      <div className="flex gap-3">
        {data.map((company) => (
          <CompanyButton
            onClick={onButtonClick}
            key={company.id}
            data={company}
            currentCompany={currentCompany}
          />
        ))}
      </div>
    </header>
  );
}
