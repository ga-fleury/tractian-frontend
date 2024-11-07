export interface Company {
  id: string;
  name: string;
}

export interface Location {
  id: string;
  name: string;
  parentId?: string | null;
}

export interface Asset {
  id: string;
  name: string;
  parentId?: string | null;
  locationId?: string | null;
  sensorType?: string;
  status?: string | null;
  sensorId?: string | null;
}

export interface Component extends Asset {
  sensorId: string;
  sensorType: string;
  status: string;
  gatewayID: string;
  locationId?: string;
}

export interface TreeNode {
  location?: Location;
  asset?: Asset;
  children: TreeNode[];
}
