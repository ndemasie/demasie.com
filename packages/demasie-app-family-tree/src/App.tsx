import {
  Background,
  ReactFlow,
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
} from '@xyflow/react'
import React, { useCallback } from 'react'

import '@xyflow/react/dist/style.css'

import { DIRECTION, NODE_TYPES } from './consts'
import { initialTree, treeRootId } from './utils/initialElements'
import { layoutElements } from './utils/layoutElements'

const { nodes: positionedNodes, edges: positionedEdges } = layoutElements(
  initialTree,
  treeRootId,
)

export const LayoutFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(positionedNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(positionedEdges)

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds,
        )
      })
    },
    [setEdges],
  )

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = layoutElements(
        initialTree,
        treeRootId,
        direction,
      )

      setNodes([...layoutedNodes])
      setEdges([...layoutedEdges])
    },
    [setNodes, setEdges],
  )

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        nodeTypes={NODE_TYPES}
        style={{ backgroundColor: '#F7F9FB' }}
      >
        <Panel position="top-right">
          <button
            className="xy-theme__button"
            onClick={() => onLayout(DIRECTION.TOP_BOTTOM)}
          >
            vertical layout
          </button>
          <button
            className="xy-theme__button"
            onClick={() => onLayout(DIRECTION.LEFT_RIGHT)}
          >
            horizontal layout
          </button>
        </Panel>
        <Background />
      </ReactFlow>
    </div>
  )
}
