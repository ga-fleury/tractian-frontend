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
    // Check if the current node is an asset node with sensorType "energy"
    const hasEnergyAsset = !!(node.asset && node.asset.sensorType === "energy");

    // Recursively filter children
    const filteredChildren = filterTreeByEnergyAssets(node.children);

    // If the current node has an energy asset or any child has one, include it in the result
    if (hasEnergyAsset || filteredChildren.length > 0) {
      acc.push({
        ...node,
        children: filteredChildren, // Include the filtered children
      });
    }

    return acc;
  }, []);
}

export function filterAssetsByStatus(nodes: TreeNode[]): TreeNode[] {
  return nodes.reduce((acc: TreeNode[], node: TreeNode) => {
    const asset = node.asset;
    const children = node.children;

    // Check if the asset status is 'alert'
    const isAlert = asset && asset.status === "alert";

    // Recursively filter children
    const filteredChildren = filterAssetsByStatus(children);

    // Only keep the node if it has an alert asset or any alert children
    if (isAlert || filteredChildren.length > 0) {
      acc.push({
        ...node,
        children: filteredChildren, // Include only filtered children
      });
    }

    return acc;
  }, []);
}

export function filterTree(tree: TreeNode[], filterType: string): TreeNode[] {
  if (filterType === "energy") {
    return tree.reduce<TreeNode[]>((acc: TreeNode[], node: TreeNode) => {
      // Check if the current node is an asset node with sensorType "energy"
      const hasEnergyAsset = !!(
        node.asset && node.asset.sensorType === "energy"
      );

      // Recursively filter children
      const filteredChildren = filterTreeByEnergyAssets(node.children);

      // If the current node has an energy asset or any child has one, include it in the result
      if (hasEnergyAsset || filteredChildren.length > 0) {
        acc.push({
          ...node,
          children: filteredChildren, // Include the filtered children
        });
      }

      return acc;
    }, []);
  } else if (filterType === "critical") {
    return tree.reduce((acc: TreeNode[], node: TreeNode) => {
      const asset = node.asset;
      const children = node.children;

      // Check if the asset status is 'alert'
      const isAlert = asset && asset.status === "alert";

      // Recursively filter children
      const filteredChildren = filterAssetsByStatus(children);

      // Only keep the node if it has an alert asset or any alert children
      if (isAlert || filteredChildren.length > 0) {
        acc.push({
          ...node,
          children: filteredChildren, // Include only filtered children
        });
      }

      return acc;
    }, []);
  }
}
