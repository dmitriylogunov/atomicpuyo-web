import _ from 'lodash';
import GridData, {emptyCell} from "./grid_data";
import {groupTypeIBlock, groupTypeIIBlock, groupTypeLBlock, groupTypeOBlock} from "../components/group";
export const queueSize = 2;

const groupWidth = 3;
const groupHeight = 3;

export type GroupQueueItem = {
  gridData: GridData
}

class GroupQueueData {
  private readonly groupQueueData: Array<GroupQueueItem>;
  private readonly groupTypeCount: number;
  private readonly colourCount: number;

  constructor(groupTypeCount: number, colourCount: number) {
    this.colourCount = colourCount;
    this.groupTypeCount = groupTypeCount;

    this.groupQueueData = new Array<GroupQueueItem>(queueSize);

    for (let i=0; i<this.groupQueueData.length; i++) {
      this.groupQueueData[i] = this.createNewItem();
    }
  }

  private createNewItem(): GroupQueueItem {
    const gridData: GridData = new GridData(
      groupWidth,
      groupHeight,
      this.getGridDataOfGroup(
        _.random(0, this.groupTypeCount-1),
        this.colourCount,
      )
    );

    const newQueueItem: GroupQueueItem = {
      gridData: gridData
    }

    return newQueueItem;
  }

  private readonly getGridDataOfGroup = (blockType: number, colourCount: number): Array<number> => {
    switch (blockType) {
      case groupTypeIBlock: {
        let color1: number = _.random(1, colourCount);
        let color2: number = _.random(1, colourCount);
        return ([
          color1, emptyCell, emptyCell,
          color2, emptyCell, emptyCell,
          emptyCell, emptyCell, emptyCell
        ]);
      }
      case groupTypeLBlock: {
        let color1: number = _.random(1, colourCount);
        let color2: number = _.random(1, colourCount);
        return ([
          color1, emptyCell, emptyCell,
          color2, color2, emptyCell,
          emptyCell, emptyCell, emptyCell
        ]);
      }
      case groupTypeIIBlock: {
        let color1: number = _.random(0, colourCount);
        let color2: number = _.random(0, colourCount);
        while (color1 == color2) {
          color2 = _.random(0, colourCount);
        }
        return [color1, color2, emptyCell,
          color1, color2, emptyCell,
          emptyCell, emptyCell, emptyCell
        ];
      }
      case groupTypeOBlock: {
        let color: number = _.random(0, colourCount);
        return [color, color, emptyCell,
          color, color, emptyCell,
          emptyCell, emptyCell, emptyCell
        ];
      }
      default:
        throw 'Atomic puyo: Requested block type is out of supported range';
    }
  }

  public pop(): GroupQueueItem {
    this.groupQueueData.push(this.createNewItem());
    const nextItem = this.groupQueueData.shift();
    if (nextItem) {
      return nextItem;
    } else {
      throw 'Atomic puyo: Group queue is empty'
    }
  }

  public getData(): Array<GroupQueueItem> {
    return this.groupQueueData;
  }
}

export default GroupQueueData