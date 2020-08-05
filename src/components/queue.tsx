import React, {useState} from 'react';
import Group from "./group";
import QueueData from "../classes/queue_data";

interface QueueProps {
  queueData: QueueData;
}

const Queue = (props: QueueProps) => {
    const queueDataArray = props.queueData.getData();
    const queue: Array<JSX.Element> = queueDataArray.map(item => (<Group groupType={item}/>));

    return (
      <div className={"queue"}>
        {queue}
      </div>
    )
  }


export default Queue;