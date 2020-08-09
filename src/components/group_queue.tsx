import React from 'react';
import Group from "./group";
import GroupQueueData, {GroupQueueItem} from "../classes/group_queue_data";

interface GroupQueueProps {
  groupQueueData: GroupQueueData;
}

const GroupQueue = (props: GroupQueueProps) => {
    const queueData: Array<GroupQueueItem> = props.groupQueueData.getData();

    const renderedQueue = queueData.map((item, index) => (<Group
      key={index}
      gridData={item.gridData}
    />));

    return (
      <div className={"queue"}>
        {renderedQueue}
      </div>
    )
  }


export default GroupQueue;