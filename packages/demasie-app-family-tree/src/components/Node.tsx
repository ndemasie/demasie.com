import { Handle, Position } from '@xyflow/react'
import { memo } from 'react'

export const Node = memo(({ data }) => {
  const { isSpouse, isSibling, label, direction } = data

  const isTreeHorizontal = direction === 'LR'

  const getTargetPosition = () => {
    if (isSpouse) {
      return isTreeHorizontal ? Position.Top : Position.Left
    } else if (isSibling) {
      return isTreeHorizontal ? Position.Bottom : Position.Right
    }
    return isTreeHorizontal ? Position.Left : Position.Top
  }

  const isRootNode = data?.isRoot
  const hasSiblings = !!data?.siblings?.length
  const hasSpouses = !!data?.spouses?.length
  const hasChildren = !!data?.children?.length

  return (
    <div className="nodrag">
      {/* For children */}
      {hasChildren && (
        <Handle
          type="source"
          position={isTreeHorizontal ? Position.Right : Position.Bottom}
          id={isTreeHorizontal ? Position.Right : Position.Bottom}
        />
      )}

      {/* For spouses */}
      {hasSpouses && (
        <Handle
          type="source"
          position={isTreeHorizontal ? Position.Bottom : Position.Right}
          id={isTreeHorizontal ? Position.Bottom : Position.Right}
        />
      )}

      {/* For siblings */}
      {hasSiblings && (
        <Handle
          type="source"
          position={isTreeHorizontal ? Position.Top : Position.Left}
          id={isTreeHorizontal ? Position.Top : Position.Left}
        />
      )}

      {/* Target Handle */}
      {!isRootNode && (
        <Handle
          type={'target'}
          position={getTargetPosition()}
          id={getTargetPosition()}
        />
      )}
      <div>{label}</div>
    </div>
  )
})
