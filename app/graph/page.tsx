"use client";

import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import ReactFlow, {
  Node, Edge, Background, Controls, MiniMap,
  useNodesState, useEdgesState, BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import { graphNodes, graphEdges } from "@/data/graph";
import { Sparkles, ZoomIn, Info } from "lucide-react";

const typePositions: Record<string, { x: number; y: number }[]> = {
  user: [{ x: 400, y: 300 }],
  skill: [
    { x: 150, y: 150 }, { x: 150, y: 280 }, { x: 150, y: 410 },
    { x: 100, y: 170 }, { x: 100, y: 310 }, { x: 100, y: 450 },
  ],
  job: [
    { x: 680, y: 100 }, { x: 680, y: 250 }, { x: 680, y: 400 }, { x: 680, y: 550 },
  ],
  scholarship: [
    { x: 400, y: 520 }, { x: 550, y: 560 }, { x: 250, y: 560 },
  ],
  scheme: [
    { x: 200, y: 520 }, { x: 350, y: 580 }, { x: 500, y: 520 },
  ],
  course: [
    { x: 400, y: 100 }, { x: 540, y: 80 }, { x: 260, y: 80 },
  ],
  global: [{ x: 900, y: 300 }],
  finance: [{ x: 680, y: 680 }],
};

const typeColors: Record<string, string> = {
  user: "#2563EB",
  skill: "#7C3AED",
  job: "#22C55E",
  scholarship: "#F59E0B",
  scheme: "#06B6D4",
  course: "#A78BFA",
  global: "#EF4444",
  finance: "#22C55E",
};

const positionCounters: Record<string, number> = {};

function buildReactFlowNodes(): Node[] {
  Object.keys(typePositions).forEach((k) => (positionCounters[k] = 0));

  return graphNodes.map((node) => {
    const positions = typePositions[node.type] || [{ x: 400, y: 300 }];
    const idx = positionCounters[node.type] || 0;
    const pos = positions[idx % positions.length];
    positionCounters[node.type] = idx + 1;
    const color = typeColors[node.type] || "#94A3B8";

    return {
      id: node.id,
      position: pos,
      data: { label: node.label, type: node.type, description: node.description, match: node.match, color },
      style: {
        background: `${color}15`,
        border: `1px solid ${color}40`,
        borderRadius: 12,
        padding: "8px 14px",
        color: "white",
        fontSize: node.type === "user" ? 14 : node.type === "global" ? 13 : 11,
        fontWeight: node.type === "user" || node.type === "global" ? 800 : 600,
        boxShadow: node.type === "user" || node.type === "global" ? `0 0 20px ${color}40` : "none",
        minWidth: node.type === "user" ? 120 : 90,
        textAlign: "center" as const,
      },
    };
  });
}

function buildReactFlowEdges(): Edge[] {
  return graphEdges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: edge.label,
    animated: edge.animated,
    style: { stroke: "rgba(37,99,235,0.4)", strokeWidth: 1.5 },
    labelStyle: { fill: "#71717A", fontSize: 9 },
    labelBgStyle: { fill: "rgba(9,9,11,0.9)", stroke: "rgba(255,255,255,0.05)", strokeWidth: 1 },
  }));
}

const initialNodes = buildReactFlowNodes();
const initialEdges = buildReactFlowEdges();

const legendItems = [
  { type: "You", color: "#2563EB" },
  { type: "Skills", color: "#7C3AED" },
  { type: "Jobs", color: "#22C55E" },
  { type: "Scholarships", color: "#F59E0B" },
  { type: "Schemes", color: "#06B6D4" },
  { type: "Courses", color: "#A78BFA" },
  { type: "Global", color: "#EF4444" },
];

export default function GraphPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<{ label: string; description?: string; match?: number; type: string } | null>(null);

  const onNodeClick = useCallback((_: any, node: Node) => {
    setSelectedNode(node.data);
  }, []);

  return (
    <div className="min-h-screen p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-3xl font-black text-white mb-1">Opportunity Graph</h1>
        <p className="text-zinc-400 text-sm">Explore your connected opportunity universe — click any node to learn more</p>
      </motion.div>

      <div className="relative rounded-2xl overflow-hidden" style={{ height: "calc(100vh - 240px)", border: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Background */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, rgba(37,99,235,0.05) 0%, rgba(9,9,11,0.98) 70%)"
        }} />

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.3}
          maxZoom={2}
        >
          <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="rgba(255,255,255,0.04)" />
          <Controls style={{
            background: "rgba(24,24,27,0.95)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
          }} />
          <MiniMap
            style={{
              background: "rgba(9,9,11,0.9)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
            }}
            nodeColor={(node) => node.data?.color || "#3F3F46"}
            maskColor="rgba(0,0,0,0.6)"
          />
        </ReactFlow>

        {/* Legend */}
        <div className="absolute top-4 left-4 p-4 rounded-2xl"
          style={{ background: "rgba(9,9,11,0.9)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(10px)" }}>
          <p className="text-zinc-500 text-xs font-medium mb-3 flex items-center gap-1.5">
            <Info className="w-3 h-3" />Legend
          </p>
          <div className="space-y-2">
            {legendItems.map(({ type, color }) => (
              <div key={type} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ background: `${color}30`, border: `1px solid ${color}` }} />
                <span className="text-zinc-400 text-xs">{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected node info panel */}
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 right-4 p-4 rounded-2xl w-56"
            style={{ background: "rgba(9,9,11,0.95)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <p className="text-white font-semibold text-sm">Selected Node</p>
            </div>
            <p className="text-white font-bold text-base mb-1">{selectedNode.label}</p>
            <p className="text-zinc-400 text-xs mb-2 capitalize">{selectedNode.type}</p>
            {selectedNode.description && (
              <p className="text-zinc-500 text-xs leading-relaxed">{selectedNode.description}</p>
            )}
            {selectedNode.match !== undefined && (
              <div className="mt-3 pt-3 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 text-xs">Match</span>
                  <span className="text-green-400 text-xs font-bold">{selectedNode.match}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full mt-1 overflow-hidden">
                  <div className="h-full rounded-full bg-green-400" style={{ width: `${selectedNode.match}%` }} />
                </div>
              </div>
            )}
            <button onClick={() => setSelectedNode(null)}
              className="mt-3 text-zinc-600 text-xs hover:text-zinc-400 transition-colors">
              Dismiss ×
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
