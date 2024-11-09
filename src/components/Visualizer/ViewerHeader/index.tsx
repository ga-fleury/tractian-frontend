import { Company } from "@/app/types/types";
import { useEffect, useState } from "react";

interface Props {
  currentCompany: Company;
  onFilterClick: (filtersStates: { [key: string]: boolean }) => void;
}

export function ViewerHeader({ currentCompany, onFilterClick }: Props) {
  const initialStates = {
    energy: false,
    critical: false,
  };

  const [filterButtonStates, setFilterButtonStates] = useState<{
    [key: string]: boolean;
  }>(initialStates);

  useEffect(() => {
    setFilterButtonStates(initialStates);
  }, [currentCompany]);

  useEffect(() => {
    onFilterClick(filterButtonStates)
  }, [filterButtonStates])

  const handleFilterClick = (buttonKey: string) => {
    setFilterButtonStates((prevStates) => {
      const newfilterButtonStates = {
        ...prevStates,
        [buttonKey]: !prevStates[buttonKey],
      };
      return newfilterButtonStates;
    });
  };

  if (currentCompany.id == "") {
    return (
      <div className="relative w-full h-full">
        <div className="flex items-end  right-[10%] top-0 absolute">
          <p className="text-lg text-gray-400">
            por favor selecione uma empresa
          </p>
          <img
            className="w-[50px] h-[50px] mb-1 ml-2"
            src="https://gist.githubusercontent.com/ga-fleury/ec2c10610daa4b216a7c812fd07ff1b2/raw/4009960bad01c731a3d87ab73d55a83d3201206f/corner-right-up.svg"
            alt=""
          />
        </div>
        ;
      </div>
    );
  }

  return (
    <>
      <div className="flex place-content-between">
        <h1 className="text-2xl text-black">
          Ativos{" "}
          <span className="text-lg text-gray-400">/ {currentCompany.name}</span>
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleFilterClick("energy")}
          style={{
            backgroundColor: filterButtonStates.energy ? "#2188ff" : "white",
            color: filterButtonStates.energy ? "white" : "black",
            border: filterButtonStates.energy ? "2px solid #2188ff" : "2px solid gray",
          }}
          className="p-1 border-gray-400 border-2 rounded-[5px] px-6"
        >
          Sensor de Energia
        </button>
        <button
          onClick={() => handleFilterClick("critical")}
          style={{
            backgroundColor: filterButtonStates.critical ? "#2188ff" : "white",
            color: filterButtonStates.critical ? "white" : "black",
            border: filterButtonStates.critical ? "2px solid #2188ff" : "2px solid gray",
          }}
          className="p-1 border-gray-400 border-2 rounded-[5px] px-6"
        >
          Crítico
        </button>
      </div>
    </>
  );
}
