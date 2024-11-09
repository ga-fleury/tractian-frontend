"use client";

import { useState, useMemo, useEffect } from "react";
import type { Company, Asset, TreeNode } from "@/app/types/types";
import { getDataFromApi } from "@/app/utils/apiUtils";
import { Header } from "../Header";
import { ViewerHeader } from "./ViewerHeader";
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

  const [unfilteredTreeData, setUnfilteredTreeData] = useState<TreeNode[]>([]);

  const energyFilteredTree = useMemo(
    () => filterTree(treeData, "energy"),
    [unfilteredTreeData]
  );

  const criticalFilteredTree = useMemo(
    () => filterTree(treeData, "critical"),
    [unfilteredTreeData]
  );

  const bothFiltersTree = useMemo(() => {
    return filterTree(filterTree(treeData, "critical"), "energy");
  }, [unfilteredTreeData]);

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
      setUnfilteredTreeData(tree);
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

  function onFilter(filterButtonStates: { [key: string]: boolean }) {
    if (Object.values(filterButtonStates).every((val) => val === false)) {
      setTreeData(unfilteredTreeData);
      return;
    }

    if (
      Object.values(filterButtonStates).every((val) => val === true) &&
      bothFiltersTree
    ) {
      setTreeData(bothFiltersTree);
      return;
    }

    if (
      !filterButtonStates.energy &&
      filterButtonStates.critical &&
      criticalFilteredTree
    ) {
      setTreeData(criticalFilteredTree);
      return;
    }
    if (
      filterButtonStates.energy &&
      !filterButtonStates.critical &&
      energyFilteredTree
    ) {
      setTreeData(energyFilteredTree);
      return;
    }
  }

  return (
    <>
      <Header
        data={data}
        currentCompany={currentCompany}
        onButtonClick={handleButtonClick}
      />
      {loading ? <Loader /> : <></>}
      <div className="w-full h-[50px] flex place-content-between items-center px-6 my-4">
        <ViewerHeader
          currentCompany={currentCompany}
          onFilterClick={onFilter}
        />
      </div>
      <div className="grid grid-cols-[3fr_5fr]">
        <Tree
          data={treeData}
          currentCompany={currentCompany}
          onSelectAsset={handleAssetSelect}
          currentAsset={currentAsset}
        />
        <AssetView
          currentAsset={currentAsset}
          currentCompany={currentCompany}
        />
      </div>
    </>
  );
}
