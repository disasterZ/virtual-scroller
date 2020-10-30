import React, { Component } from 'react';

const setInitialState = settings => {
    const {
        itemHeight,
        amount,
        tolerance,
        minIndex,
        maxIndex,
        startIndex
    } = settings;
    const viewportHeight = amount * itemHeight;
    const totalHeight = (maxIndex - minIndex + 1) * itemHeight;
    const toleranceHeight = tolerance * itemHeight;
    const bufferHeight = viewportHeight + 2 * toleranceHeight;
    const bufferedItems = amount + 2 * tolerance;
    const itemsAbove = startIndex - tolerance - minIndex;
    const topPaddingHeight = itemsAbove * itemHeight;
    const bottomPaddingHeight = totalHeight - topPaddingHeight;
    const initialPosition = topPaddingHeight + toleranceHeight;
    return {
        settings,
        viewportHeight,
        totalHeight,
        toleranceHeight,
        bufferHeight,
        bufferedItems,
        topPaddingHeight,
        bottomPaddingHeight,
        initialPosition,
        data: [],
        list: []
    };
};

class VirtualScroller extends Component {
    constructor(props) {
        super(props);
        this.state = setInitialState(props.settings);
        this.viewportElement = React.createRef();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // 当传入的type发生变化的时候，更新state
        if (nextProps.list !== prevState.list) {
            return {
                list: nextProps.list,
            };
        }
        // 否则，对于state不进行任何操作
        return null;

    }

    componentDidMount() {
        this.viewportElement.current.scrollTop = this.state.initialPosition;
        if (!this.state.initialPosition) {
            this.runScroller({ target: { scrollTop: 0 } });
        }
    }


    runScroller = ({ target: { scrollTop } }) => {
        const {
            totalHeight,
            toleranceHeight,
            bufferedItems,
            settings: { itemHeight, minIndex },
            list,
        } = this.state;
        const index =
            minIndex + Math.floor((scrollTop - toleranceHeight) / itemHeight);
        const data = this.props.get(index, bufferedItems, list);
        const topPaddingHeight = Math.max((index - minIndex) * itemHeight, 0);
        const bottomPaddingHeight = Math.max(
            totalHeight - topPaddingHeight - data.length * itemHeight,
            0
        );

        this.setState({
            topPaddingHeight,
            bottomPaddingHeight,
            data
        });
        console.log(this.state.list);
    };

    render() {
        const {
            viewportHeight,
            topPaddingHeight,
            bottomPaddingHeight,
            data
        } = this.state;
        return (
            // <Table
            //     columns={this.props.header}
            //     dataSource={data}
            //     pagination={{ pageSize: data.length }}
            //     scroll={{ y: 240 }}
            //     rowKey={record => record._id}
            //     className="viewport"
            //     ref={this.viewportElement}
            //     onScroll={this.runScroller}
            //     style={{ height: viewportHeight, width: '100%' }}
            // />
            <div
                className="viewport"
                ref={this.viewportElement}
                onScroll={this.runScroller}
                style={{ height: viewportHeight , width: '100%'}}
            >
                <div style={{ height: topPaddingHeight }} />
                    {this.props.row(data,this.props.columns)}
                <div style={{ height: bottomPaddingHeight }} />
            </div>
        );
    }
}


export default VirtualScroller;