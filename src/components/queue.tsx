import React from 'react';
import Group from './group';

class Queue extends React.Component<{}, { queue: Array<Group> }> {
  private readonly length: number = 2;

  constructor(props) {
    super(props);

    let queue: Array<Group> = Array(this.length);
    for (let i = 0; i < this.length; i++) {
      queue[i] = new Group(Group.type_);
    }
  }

  public next(): Group {
    return this.state.queue[0];

  }
}

export default Queue;