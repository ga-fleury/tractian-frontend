import type { Company } from "@/app/types/types";

interface Props {
  data: Company;
  currentCompany: Company;
  onClick: (data: Company) => void;
}

export function CompanyButton({ data, currentCompany, onClick }: Props) {
  return (
    <button
      key={data.id}
      name={data.name}
      onClick={() => onClick(data)}
      className="bg-[#023b78] px-4 font-bold py-1"
      style={{
        backgroundColor: data == currentCompany ? "#2188ff" : "#023b78",
      }}
    >
      {data.name} Unit
    </button>
  );
}
