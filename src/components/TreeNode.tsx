"use client";

import { TreeNode, Asset } from "@/app/types/types";
import { useState } from "react";

interface TreeNodeProps {
  node: TreeNode;
  onSelectAsset: (asset: Asset | null) => void;
  currentAsset: Asset | null;
}

export function TreeNodeComponent({
  node,
  onSelectAsset,
  currentAsset,
}: TreeNodeProps) {
  const handleNodeClick = () => {
    onSelectAsset(node.asset ? node.asset : null);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // simple chevron with no SVG
  const Chevron = () => (
    <span
      style={{
        display: "inline-block",
        transform: `rotate(${isOpen ? 90 : 0}deg)`,
        transition: "transform 0.3s ease",
        color: node.asset == currentAsset && currentAsset ? "white" : "gray",
        marginLeft: "8px",
      }}
    >
      ▶
    </span>
  );

  return (
    <li className="mt-1 w-[100%]">
      <div
        onClick={handleToggle}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          marginLeft: node.children.length == 0 ? "21px" : "0px",
          backgroundColor:
            node.asset == currentAsset && currentAsset
              ? "#2188ff"
              : "transparent",
          color: node.asset == currentAsset && currentAsset ? "white" : "black",
        }}
      >
        {node.children.length > 0 && <Chevron />}
        {node.location ? (
          <>
            <img
              className="mx-1 inline-block"
              src="https://raw.githubusercontent.com/tractian/challenges/refs/heads/main/assets/location.png"
              width="24"
              alt=""
            />
            <span>{node.location.name}</span>
          </>
        ) : node.asset && node.asset.sensorType ? (
          <div onClick={handleNodeClick} className="w-[100%]">
            <img
              className="mx-1 inline-block"
              src={
                node.asset == currentAsset && currentAsset
                  ? "https://gist.githubusercontent.com/ga-fleury/ec2c10610daa4b216a7c812fd07ff1b2/raw/6b444238aacb47f7ab8843b22cb446c54d2a9229/component_white.png"
                  : "https://raw.githubusercontent.com/tractian/challenges/refs/heads/main/assets/component.png"
              }
              width="24"
              alt=""
            />
            <span>
              {node.asset.name}
              <img
                src={
                  node.asset.status == "operating"
                    ? "https://gist.githubusercontent.com/ga-fleury/ec2c10610daa4b216a7c812fd07ff1b2/raw/07a3ba853dbcecbea1b5706d30092ee7d05d0378/bolt_24dp_52C41A.svg"
                    : "https://gist.githubusercontent.com/ga-fleury/ec2c10610daa4b216a7c812fd07ff1b2/raw/07a3ba853dbcecbea1b5706d30092ee7d05d0378/alert-triangle.svg"
                }
                alt=""
                className="inline"
                style={{
                  width: node.asset.status == "operating" ? "24px" : "16px",
                  marginLeft: node.asset.status == "operating" ? "4px" : "6px",
                  marginBottom:
                    node.asset.status == "operating" ? "0px" : "2px",
                }}
              />
            </span>
          </div>
        ) : node.asset ? (
          <div onClick={handleNodeClick} className="w-[100%]">
            <img
              className="mx-1 inline-block"
              src={
                node.asset == currentAsset && currentAsset
                  ? "https://gist.githubusercontent.com/ga-fleury/ec2c10610daa4b216a7c812fd07ff1b2/raw/6b444238aacb47f7ab8843b22cb446c54d2a9229/asset_white.png"
                  : "https://raw.githubusercontent.com/tractian/challenges/refs/heads/main/assets/asset.png"
              }
              width="24"
              alt=""
            />
            <span>
              {node.asset.name}
              <img
                src={
                  node.asset.status == "operating"
                    ? "https://gist.githubusercontent.com/ga-fleury/ec2c10610daa4b216a7c812fd07ff1b2/raw/07a3ba853dbcecbea1b5706d30092ee7d05d0378/bolt_24dp_52C41A.svg"
                    : "https://gist.githubusercontent.com/ga-fleury/ec2c10610daa4b216a7c812fd07ff1b2/raw/07a3ba853dbcecbea1b5706d30092ee7d05d0378/alert-triangle.svg"
                }
                alt=""
                className="inline"
                style={{
                  width: node.asset.status == "operating" ? "24px" : "16px",
                  marginLeft: node.asset.status == "operating" ? "4px" : "6px",
                  marginBottom:
                    node.asset.status == "operating" ? "0px" : "2px",
                }}
              />
            </span>
          </div>
        ) : null}
      </div>
      {isOpen && node.children && node.children.length > 0 && (
        <ul
          style={{
            cursor: node.children.length > 0 ? "pointer" : "default",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            paddingLeft: node.children.length > 0 && isOpen ? "10px" : "0", // Left padding for open nodes
            borderLeft:
              node.children.length > 0 && isOpen ? "2px solid #0070f3" : "none", // Changes border color and width
            marginLeft: "14px", // Optional margin for aesthetics
          }}
        >
          {node.children.map((child, index) => (
            <TreeNodeComponent
              key={index}
              node={child}
              onSelectAsset={onSelectAsset}
              currentAsset={currentAsset}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
