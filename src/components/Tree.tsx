import { TreeNodeComponent } from "./TreeNode";
import { TreeNode, Company, Asset } from "@/app/types/types";
import { useState, useEffect, act } from "react";

interface Props {
  data: TreeNode[];
  currentCompany: Company;
  onSelectAsset: (asset: Asset | null) => void;
  onFilter: (tree: TreeNode[], buttonKey: string, active: boolean) => void;
  currentAsset: Asset | null;
}

export function Tree({
  data,
  currentCompany,
  onSelectAsset,
  currentAsset,
  onFilter,
}: Props) {
  const initialStates = {
    energy: false,
    critical: false,
  };

  const [activeStates, setActiveStates] = useState<{ [key: string]: boolean }>(
    initialStates
  );

  useEffect(() => {
    setActiveStates(
      Object.keys(initialStates).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as { [key: string]: boolean })
    );
  }, [currentCompany]);

  const handleFilterClick = (buttonKey: string) => {
    onFilter(data, buttonKey, !activeStates[buttonKey]);
    setActiveStates((prevStates) => ({
      ...prevStates,
      [buttonKey]: !prevStates[buttonKey], // Toggle active state for the specific button
    }));
  };

  return (
    <div className="bg-slate-200 p-2">
      <div className="w-[100%] h-[calc(100vh-70px)] box-border bg-white text-black p-4 border-gray-800 overflow-y-auto">
        {data.length === 0 ? (
          <div></div>
        ) : (
          <>
            <div className="flex place-content-between">
              <h1 className="text-2xl">
                Ativos{" "}
                <span className="text-lg text-gray-400">
                  / {currentCompany.name}
                </span>
              </h1>
              <div className="flex gap-4">
                <button
                  onClick={() => handleFilterClick("energy")}
                  style={{
                    backgroundColor: activeStates.energy ? "#2188ff" : "white",
                    color: activeStates.energy ? "white" : "black",
                    border: activeStates.energy ? "none" : "2px solid gray",
                  }}
                  className="p-1 border-gray-400 border-2 rounded-[5px] px-6"
                >
                  Sensor de Energia
                </button>
                <button
                  onClick={() => handleFilterClick("critical")}
                  style={{
                    backgroundColor: activeStates.critical
                      ? "#2188ff"
                      : "white",
                    color: activeStates.critical ? "white" : "black",
                    border: activeStates.critical ? "none" : "2px solid gray",
                  }}
                  className="p-1 border-gray-400 border-2 rounded-[5px] px-6"
                >
                  Crítico
                </button>
              </div>
            </div>
            <input type="text" name="" id="" placeholder="text" />
          </>
        )}
        <ul>
          {data.map((node, index) => (
            <TreeNodeComponent
              key={index}
              node={node}
              onSelectAsset={onSelectAsset}
              currentAsset={currentAsset}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
