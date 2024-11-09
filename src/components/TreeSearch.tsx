import { useCallback, useState } from "react";
import { TreeNode } from "@/app/types/types";

interface Props {
  data: TreeNode[];
  onChange: (filteredTree: TreeNode[]) => void;
}

export function TreeSearch({ data, onChange }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<TreeNode[]>(data);

  const filterTree = useCallback(
    (nodes: TreeNode[], term: string): TreeNode[] => {
      return nodes.reduce<TreeNode[]>((acc, node) => {
        const { location, asset, children } = node;

        const matchesLocation =
          location && location.name.toLowerCase().includes(term.toLowerCase());
        const matchesAsset =
          asset && asset.name.toLowerCase().includes(term.toLowerCase());

        const filteredChildren = filterTree(children, term);

        if (matchesLocation || matchesAsset || filteredChildren.length > 0) {
          acc.push({
            ...(location ? { location } : {}),
            ...(asset ? { asset } : {}),
            children: filteredChildren,
          });
        }

        return acc;
      }, []);
    },
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    console.log(term);
    setSearchTerm(term);
    setFilteredData(() => filterTree(data, term));
    onChange(filteredData);
  };

  return (
    <div className="w-full flex">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 border rounded w-full"
      />
      <img
        className="mr-4 ml-[-40px]"
        src="https://gist.githubusercontent.com/ga-fleury/ec2c10610daa4b216a7c812fd07ff1b2/raw/947dbf3cbde283014561bc8660899485b4f37f1c/search.svg"
        alt=""
      />

      <div></div>
    </div>
  );
}
