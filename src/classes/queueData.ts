import _ from 'lodash';
export const queueSize = 2;

class QueueData {
  private readonly data: Array<number>;
  private readonly groupTypeCount: number;

  constructor(groupTypeCount: number) {
    this.data = new Array<number>(queueSize);
    this.groupTypeCount = groupTypeCount;

    for (let i=0; i<this.data.length; i++) {
      this.data[i] = this.createNewItem();
    }
  }

  private createNewItem(): number {
    return _.random(0, this.groupTypeCount)
  }

  public pop() {
    this.data.push(this.createNewItem());
    return this.data.shift();
  }

  public getData() {
    return this.data;
  }
}

export default QueueData