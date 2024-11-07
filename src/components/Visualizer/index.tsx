"use client";

import { useState } from "react";
import type { Company, Asset, TreeNode } from "@/app/types/types";
import { getDataFromApi } from "@/app/utils/apiUtils";
import { Header } from "../Header";
import { AssetView } from "./AssetView";
import { buildTree, filterTree } from "@/app/utils/treeUtils";
import { Tree } from "@/components/Tree";

interface Props {
  data: Company[];
}

function Loader() {
  return (
    <div className="h-[calc(100vh-50px)] mt-[50px] w-[100vw] absolute top-0 left-0 bg-black opacity-30 flex items-center justify-center">
      <div className="w-[50px] h-[50px] absolute z-[800] left-[50%] top-[50%]"></div>
      <p className="text-xl"> Loading...</p>
    </div>
  );
}

export function Visualizer({ data }: Props) {
  const [currentCompany, setCurrentCompany] = useState<Company>({
    id: "",
    name: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const [treeData, setTreeData] = useState<TreeNode[]>([]);

  const [currentAsset, setCurrentAsset] = useState<Asset | null>(null);

  const [filteredTreeData, setFilteredTreeData] = useState<TreeNode[]>([]);

  async function handleButtonClick(company: Company) {
    if (currentCompany == company) {
      return;
    }
    try {
      setLoading(true);
      setCurrentAsset(null);
      const [locations, assets] = await Promise.all([
        getDataFromApi(company.id, "locations"),
        getDataFromApi(company.id, "assets"),
      ]);
      const tree = buildTree(locations, assets);
      setTreeData(tree);
      console.log(tree);
      setCurrentCompany(company);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  }

  const handleAssetSelect = (asset: Asset | null) => {
    setCurrentAsset(asset);
  };

  function onFilter(tree: TreeNode[], buttonKey: string, active: boolean) {
    const filteredTree = filterTree(tree, buttonKey);
    if (active && filteredTree) {
      setFilteredTreeData(treeData);
      setTreeData((tree) => (tree = filteredTree));
      return;
    }
    setTreeData((tree) => (tree = filteredTreeData));
  }

  return (
    <>
      <Header
        data={data}
        currentCompany={currentCompany}
        onButtonClick={handleButtonClick}
      />
      {loading ? <Loader /> : <></>}
      <div className="grid grid-cols-[3fr_5fr] ">
        <Tree
          data={treeData}
          filteredTreeData={filteredTreeData}
          currentCompany={currentCompany}
          onSelectAsset={handleAssetSelect}
          currentAsset={currentAsset}
          onFilter={onFilter}
        />
        <AssetView
          currentAsset={currentAsset}
          currentCompany={currentCompany}
        />
      </div>
    </>
  );
}
