import React, {Component} from 'react'
import {Col, Row} from 'antd'

class InfoList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {headerList, infoList, infoKeyMap, style} = this.props

        return (
            <div style={style}>
                <Row style={{borderBottom: '1px rgb(228, 217, 217) solid', fontWeight: 800, lineHeight: '28px'}}>
                    {
                        headerList.map((item, idx) => <Col key={'hl' + idx} span={8}
                                                           style={{paddingRight: 30, fontSize: '18px'}}>{item}</Col>)
                    }
                </Row>
                <Row style={{marginTop: 15}}>
                    {
                        infoList.map((info, idx) => {
                            return <Col key={'il' + idx} span={8} style={{paddingRight: 20, lineHeight: '35px'}}>
                                {Object.keys(info).map((item, idx1) => {
                                    let value;
                                    value = info[item] ? `${info[item]}` : '--';

                                    if (item == 'hasRefund') {
                                        value = info[item] ? '是' : '否';
                                    }

                                    return infoKeyMap[item]
                                        ? <div key={'il1' + idx1}>
                                            <span style={{color: '#575757'}}>{`${infoKeyMap[item]}: `}</span><span
                                            style={{
                                                color: '#999',
                                                // float: 'right',
                                                marginRight: 40,
                                                fontFamily: 'PingFang SC',
                                                // display: 'inline-block',
                                                fontWeight: 200
                                            }}>{value}</span>
                                        </div>
                                        : null
                                })}
                            </Col>
                        })
                    }
                </Row>
            </div>
        )
    }
}

export default InfoList
