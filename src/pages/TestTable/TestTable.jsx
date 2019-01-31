import React from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';
import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer';
import { List as VList } from 'react-virtualized/dist/commonjs/List';
import ReactHeight from 'react-height'
import DataBinder from '@icedesign/data-binder';
import './index.scss'

const {Row ,Col}=Grid;
const  Student = ({student, ...rest}) =>{
  return (
      <Row className='rollList'>
        <Col span='4'>{student.name}</Col>
        <Col span='4'>{student.title}</Col>
        <Col span='4'>{student.date}</Col>
        <Col span='4'>{student.category}</Col>
        <Col span='4'>{student.state}</Col>
        <Col span='4'>{student.validData}</Col>
      </Row>
  )
}
@DataBinder({
  'studentList': {
    url: '/lyapi/testLong',
    method: 'get',
    data: { },
    defaultBindingData: {
      list:[]
    }
  }
})
export default class StudentList extends React.Component {
    static displayName ='StudentList';
    constructor(props) {
        super(props)
        this.state = {
            list: [], 
            heights:[]
        }
        this.heights=[]
    }
    componentDidMount() {
      this.props.updateBindingData('studentList');
    }

    handleHeightReady = (height, index) => {
      const heights = [...this.state.heights]
      heights.push({
          index,
          height
      })
      this.setState({
          heights
      }, this.vList.recomputeRowHeights(index))
    }
    getRowHeight = ({ index }) => {
        const row = this.heights.find(item => item.index === index)
        return row ? row.height : 30
    }


    render() {
        const { list } =this.props.bindingData.studentList;
        const renderItem = ({ index, key, style }) => {
          if (this.heights.find(item => item.index === index)) {
              return <Student key={key} student={list[index]} />
          }
          return (
              <div key={key} style={style}>
                  <ReactHeight
                      onHeightReady={height => {
                          this.handleHeightReady(height, index)
                      }}
                  >
                      <Student key={key} student={list[index]} />
                  </ReactHeight>
              </div>
          )
      }
      return (
        <IceContainer>
          <div style={{height:'80vh'}}>
              <AutoSizer>
                  {({ width, height }) => (
                      <VList
                          ref={ref => this.vList = ref}
                          width={width}
                          height={height}
                          overscanRowCount={10}
                          rowCount={list.length}
                          rowHeight={this.getRowHeight}
                          rowRenderer={renderItem}
                      />
                  )}
              </AutoSizer>
          </div>
          </IceContainer>
      )
  }
}
