import { Node } from './components/Node'

export enum ORIENTATION {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export const DIRECTION = {
  TOP_BOTTOM: 'TB',
  LEFT_RIGHT: 'LR',
}

export const DIRECTION_ORIENTATION_MAP = {
  [DIRECTION.TOP_BOTTOM]: ORIENTATION.VERTICAL,
  [DIRECTION.LEFT_RIGHT]: ORIENTATION.HORIZONTAL,
}

export enum NodeTypes {
  NODE = 'node',
}

export const NODE_TYPES = {
  [NodeTypes.NODE]: Node,
}

export const NODE_WIDTH = 150
export const NODE_HEIGHT = 36
