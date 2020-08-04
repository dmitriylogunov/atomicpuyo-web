import React, {useState} from 'react';
import Group from "./group";
import _ from "lodash";
import QueueData from "../classes/queueData";

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