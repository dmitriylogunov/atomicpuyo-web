import React from 'react';
import ReactDom from 'react-dom';
import Puyo from './puyo';
import GroupData from "../classes/groupdata";
import CSS from 'csstype';
import GamePixel, {cellDimensionInGamePixels} from "../classes/gamepixel";
import BlockData from "../classes/blockdata";
import Timer from "../classes/timer";

interface GridProps {
  gridData: GroupData,
  linkedBlock?: BlockData
  timerFrequency?: number
};

interface GridState {
};

class Grid extends React.Component<GridProps, GridState> {
  readonly gamePixelWidth = Math.floor(300 / cellDimensionInGamePixels) / 100;
  readonly gamePixelHeight = this.gamePixelWidth;

  private timer?: Timer;
  private blockComponent?: Grid | null;
  private blockElement?: Element | Text | null;

    constructor(props: GridProps) {
    super(props);

  }

  componentDidMount() {
      console.log("did mount");

    if (!this.timer) {
      this.timer = new Timer(this.timerHandler.bind(this), 50);
    }


  }

  componentDidUpdate(prevProps: Readonly<GridProps>, prevState: Readonly<GridState>, snapshot?: any) {
      console.log("did update");

    if (prevProps.linkedBlock!==this.props.linkedBlock) {
      if (this.blockComponent) {
        this.blockElement = ReactDom.findDOMNode(this.blockComponent);
        debugger;
      }
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      this.timer.destroy();
    }
  }

  private top = 0;

  timerHandler(): void {
    this.top+=3/16;
    if (this.blockElement) {
      // this.blockElement.style.top = this.top + "em";
    }
  }

  render(): JSX.Element {
    const grid = this.props.gridData.data.map((type, index) => {
      const puyo = (type == GroupData.emptyCell)
        ? ''
        : <Puyo
          type={type}
          connectTop={type == this.props.gridData.getCellToTop(index)}
          connectBottom={type == this.props.gridData.getCellToBottom(index)}
          connectLeft={type == this.props.gridData.getCellToLeft(index)}
          connectRight={type == this.props.gridData.getCellToRight(index)}
        />

      let className
        = 'cell'
        + ' cell-' + ((type == GroupData.emptyCell) ? 'empty' : 'withpuyo type' + type.toString());

      return (
        <li key={index} className={className}>{puyo}</li>
      );
    });

    const blockStyles: CSS.Properties = (this.props.linkedBlock)
      ?
      {
        top: (this.props.linkedBlock.blockPixelY * this.gamePixelHeight).toString() + "em",
        left: (this.props.linkedBlock.blockPixelX * this.gamePixelWidth).toString() + "em",
      }
      :
      {}

    const block = (this.props.linkedBlock)
      ?
        <div style={blockStyles} className="block">
          <Grid gridData={this.props.linkedBlock.getGrid()} ref={element => this.blockComponent = element}/>
        </div>

      :
      '';

    return (
      <ol className="grid">
        {block}
        {grid}
      </ol>
    )
  }
}

export default Grid;

