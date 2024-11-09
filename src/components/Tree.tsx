import { TreeNodeComponent } from "./TreeNode";
import { TreeNode, Company, Asset } from "@/app/types/types";
import { TreeSearch } from "./TreeSearch";
import { useEffect, useState } from "react";

interface Props {
  data: TreeNode[];
  currentCompany: Company;
  onSelectAsset: (asset: Asset | null) => void;
  currentAsset: Asset | null;
}

export function Tree({ data, onSelectAsset, currentAsset }: Props) {

    useEffect(() => {
        setFilteredData(data)
    }, [data])

    const [filteredData, setFilteredData] = useState<TreeNode[]>(data);

    function handleSearch(filteredTree: TreeNode[]) {
        setFilteredData(filteredTree)
        onSelectAsset(null)
    }

  return (
    <div className="bg-slate-200 p-2">
      <div className="w-[100%] h-[calc(100vh-150px)] box-border bg-white text-black border-gray-800 overflow-y-auto">
        <div className="h-[50px] border-2 border-gray mb-4 flex items-center">
            <TreeSearch data={data} onChange={handleSearch}/>
        </div>

        <ul className="px-6">
          {filteredData.map((node, index) => (
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
