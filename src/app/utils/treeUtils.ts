import { Location, Asset, TreeNode } from "../types/types";

export const buildTree = (
  locations: Location[],
  assets: Asset[]
): TreeNode[] => {
  const treeNodes: TreeNode[] = [];
  const locationMap: { [key: string]: TreeNode } = {};
  const assetMap: { [key: string]: TreeNode } = {};

  locations.forEach((location) => {
    const node: TreeNode = { location, children: [] };
    locationMap[location.id] = node;

    if (!location.parentId) {
      treeNodes.push(node);
    }
  });

  assets.forEach((asset) => {
    const node: TreeNode = { asset, children: [] };
    assetMap[asset.id] = node;

    if (asset.locationId) {
      const locationNode = locationMap[asset.locationId];
      if (locationNode) {
        locationNode.children.push(node);
      }
    } else if (asset.parentId) {
      const parentAssetNode = assetMap[asset.parentId];
      if (parentAssetNode) {
        parentAssetNode.children.push(node);
      } else {
        treeNodes.push(node);
      }
    } else {
      treeNodes.push(node);
    }
  });

  Object.values(locationMap).forEach((node) => {
    if (node.location?.parentId) {
      const parentLocationNode = locationMap[node.location.parentId];
      if (parentLocationNode) {
        parentLocationNode.children.push(node);
      }
    }
  });

  return treeNodes;
};

export function filterTreeByEnergyAssets(tree: TreeNode[]): TreeNode[] {
  return tree.reduce<TreeNode[]>((acc, node) => {
    const hasEnergyAsset = !!(node.asset && node.asset.sensorType === "energy");

    const filteredChildren = filterTreeByEnergyAssets(node.children);

    if (hasEnergyAsset || filteredChildren.length > 0) {
      acc.push({
        ...node,
        children: filteredChildren,
      });
    }

    return acc;
  }, []);
}

export function filterAssetsByStatus(nodes: TreeNode[]): TreeNode[] {
  return nodes.reduce((acc: TreeNode[], node: TreeNode) => {
    const asset = node.asset;
    const children = node.children;

    const isAlert = asset && asset.status === "alert";

    const filteredChildren = filterAssetsByStatus(children);

    if (isAlert || filteredChildren.length > 0) {
      acc.push({
        ...node,
        children: filteredChildren,
      });
    }

    return acc;
  }, []);
}

export function filterTree(
  tree: TreeNode[],
  filterType: string
): TreeNode[] | undefined {
  if (filterType === "energy") {
    return tree.reduce<TreeNode[]>((acc: TreeNode[], node: TreeNode) => {
      const hasEnergyAsset = !!(
        node.asset && node.asset.sensorType === "energy"
      );

      const filteredChildren = filterTreeByEnergyAssets(node.children);

      if (hasEnergyAsset || filteredChildren.length > 0) {
        acc.push({
          ...node,
          children: filteredChildren,
        });
      }

      return acc;
    }, []);
  } else if (filterType === "critical") {
    return tree.reduce((acc: TreeNode[], node: TreeNode) => {
      const asset = node.asset;
      const children = node.children;

      const isAlert = asset && asset.status === "alert";

      const filteredChildren = filterAssetsByStatus(children);

      if (isAlert || filteredChildren.length > 0) {
        acc.push({
          ...node,
          children: filteredChildren,
        });
      }

      return acc;
    }, []);
  }
}
