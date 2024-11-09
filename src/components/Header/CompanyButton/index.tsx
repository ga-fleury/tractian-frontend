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
      className="bg-[#023b78] px-4 font-bold py-1 flex items-center"
      style={{
        backgroundColor: data == currentCompany ? "#2188ff" : "#023b78",
      }}
    >
      <img className="w-[20px] mr-2" src="https://gist.githubusercontent.com/ga-fleury/ec2c10610daa4b216a7c812fd07ff1b2/raw/8fe27c862a954a4a9606a273422dbc1a1ac67531/square.svg" alt="" />
      {data.name} Unit
    </button>
  );
}
