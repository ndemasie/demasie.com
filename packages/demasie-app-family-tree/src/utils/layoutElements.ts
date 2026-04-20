import { Position } from '@xyflow/react'
import { layoutFromMap } from 'entitree-flex'

import {
  DIRECTION,
  DIRECTION_ORIENTATION_MAP,
  NodeTypes,
  ORIENTATION,
} from '../consts'

const NODE_WIDTH = 150
const NODE_HEIGHT = 36

const ENTITREE_SETTINGS = {
  clone: true, // returns a copy of the input, if your application does not allow editing the original object
  enableFlex: true, // has slightly better performance if turned off (node.width, node.height will not be read)
  firstDegreeSpacing: 100, // spacing in px between nodes belonging to the same source, e.g. children with same parent
  nextAfterAccessor: 'spouses', // the side node prop used to go sideways, AFTER the current node
  nextAfterSpacing: 100, // the spacing of the "side" nodes AFTER the current node
  nextBeforeAccessor: 'siblings', // the side node prop used to go sideways, BEFORE the current node
  nextBeforeSpacing: 100, // the spacing of the "side" nodes BEFORE the current node
  nodeHeight: NODE_HEIGHT, // default node height in px
  nodeWidth: NODE_WIDTH, // default node width in px
  orientation: ORIENTATION.VERTICAL, // "vertical" to see parents top and children bottom, "horizontal" to see parents left and
  rootX: 0, // set root position if other than 0
  rootY: 0, // set root position if other than 0
  secondDegreeSpacing: 100, // spacing in px between nodes not belonging to same parent eg "cousin" nodes
  sourcesAccessor: 'parents', // the prop used as the array of ancestors ids
  sourceTargetSpacing: 100, // the "vertical" spacing between nodes in vertical orientation, horizontal otherwise
  targetsAccessor: 'children', // the prop used as the array of children ids
}

export const layoutElements = (
  tree,
  rootId,
  direction = DIRECTION.TOP_BOTTOM,
) => {
  const isTreeHorizontal = direction === DIRECTION.LEFT_RIGHT

  const { nodes: entitreeNodes, rels: entitreeEdges } = layoutFromMap(
    rootId,
    tree,
    { ...ENTITREE_SETTINGS, orientation: DIRECTION_ORIENTATION_MAP[direction] },
  )

  const edges = entitreeEdges.map((edge) => {
    const [sourceHandle, targetHandle] = (() => {
      const isSpouse = !!edge.target.isSpouse
      const isSibling = !!edge.target.isSibling

      if (isSpouse && isTreeHorizontal) {
        return [Position.Bottom, Position.Top]
      }

      if (isSpouse && !isTreeHorizontal) {
        return [Position.Right, Position.Left]
      }

      if (isSibling && isTreeHorizontal) {
        return [Position.Top, Position.Bottom]
      }

      if (isSibling && !isTreeHorizontal) {
        return [Position.Left, Position.Right]
      }

      if (isTreeHorizontal) {
        return [Position.Right, Position.Left]
      }

      return [Position.Bottom, Position.Top]
    })()

    return {
      id: 'e' + edge.source.id + edge.target.id,
      source: edge.source.id,
      target: edge.target.id,
      type: 'smoothstep',
      animated: 'true',
      sourceHandle,
      targetHandle,
    }
  })

  const nodes = entitreeNodes.map((node) => {
    const [sourcePosition, targetPosition] = (() => {
      const isSpouse = !!node?.isSpouse
      const isSibling = !!node?.isSibling

      if (isSpouse && isTreeHorizontal) {
        return [Position.Bottom, Position.Top]
      }

      if (isSpouse && !isTreeHorizontal) {
        return [Position.Right, Position.Left]
      }

      if (isSibling && isTreeHorizontal) {
        return [Position.Top, Position.Bottom]
      }

      if (isSibling && !isTreeHorizontal) {
        return [Position.Left, Position.Right]
      }

      if (isTreeHorizontal) {
        return [Position.Right, Position.Left]
      }

      return [Position.Bottom, Position.Top]
    })()

    return {
      data: {
        label: node.name,
        direction,
        isRoot: node?.id === rootId,
        ...node,
      },
      id: node.id,
      type: NodeTypes.NODE,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      sourcePosition,
      targetPosition,
      position: {
        x: node.x,
        y: node.y,
      },
    }
  })

  return { nodes, edges }
}
