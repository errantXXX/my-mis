import React, { Component, PropTypes } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

const fontSize= '15px';
const passStyle = {color: "green", marginRight: "20px"};
const rejectStyle = {color: "red", marginRight: "20px"};

export default class IdentifyHistoryTable extends Component {
    constructor(props) {
        super(props);
    }

    //审核痛过
    passCheck(){
        this.props.passCheck && this.props.passCheck();
    }
    //驳回
    rejectCheck(){
        this.props.rejectCheck && this.props.rejectCheck();
    }
    
    render() {
        let {userInfo, opperInfo, recheck}  = this.props;
        let resultText = "";
        let otimeText = "";
        if(userInfo.result == 2){
            resultText = "驳回";
            otimeText = "审核时间：" + userInfo.otime;
        }else if(userInfo.result == 0){
            resultText = "未审核";
            otimeText = "";
        }else if(userInfo.result == 1){
            resultText = "通过";
            otimeText = "审核时间：" + userInfo.otime;
        }

        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '5px' }}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                    <span style={{fontSize: fontSize, flex: "1 1 50%"}}>审核来源：{userInfo.source}</span>
                    <span style={{fontSize: fontSize, fontWeight: 'bold', flex: "1 1 50%"}}></span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px', borderTop: '1px solid #e2e7eb'}}>
                    <span style={{fontSize: fontSize, fontWeight: 'bold', flex: "1 1 50%"}}>用户姓名：{userInfo.name}</span>
                    <span style={{fontSize: fontSize, fontWeight: 'bold', flex: "1 1 50%"}}>审核员</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', lineHeight: '30px', borderTop: '1px solid #e2e7eb'}}>
                    <span style={{flex: "1 1 50%"}}>手机号：{userInfo.phone || ""}</span>
                    <span style={{flex: "1 1 50%"}}>客服ID：{opperInfo.operid || ""}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', lineHeight: '30px', borderTop: '1px solid #e2e7eb'}}>
                    <span style={{flex: "1 1 50%"}}>记录ID：{userInfo.id || ""}</span>
                    <span style={{flex: "1 1 50%"}}>姓名：{opperInfo.name || ""}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', lineHeight: '30px', borderTop: '1px solid #e2e7eb'}}>
                    <span style={{flex: "1 1 50%"}}>用户ID：{userInfo.userid || ""}</span>
                    <span style={{flex: "1 1 50%"}}>手机号：{opperInfo.phone || ""}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', lineHeight: '30px', borderTop: '1px solid #e2e7eb'}}>
                    <span style={{flex: "1 1 50%"}}>学号：{userInfo.stuid || ""}</span>
                    {userInfo.result == 2 ?
                    <span style={{flex: "1 1 50%"}}>驳回原因：{userInfo.description || ""}</span>
                    : null }
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', lineHeight: '30px', borderTop: '1px solid #e2e7eb'}}>
                    <span style={{flex: "1 1 50%"}}>学校：{userInfo.school || ""}</span>
                    <span style={{flex: "1 1 50%"}}></span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e7eb',lineHeight: '40px'}}>
                    <span style={{fontSize: fontSize, fontWeight: 'bold', flex: "1 1 50%"}}>
                            审核结果：<span style={userInfo.result !== 2 ? passStyle : rejectStyle }>{ resultText }</span>{otimeText}</span>
                    <span style={{fontSize: fontSize, fontWeight: 'bold', flex: "1 1 50%"}}>
                        {/*<Button type="primary" onClick={this.passCheck.bind(this)}>通过</Button>
                        <Button style={{ marginLeft: '10px' }} onClick={this.rejectCheck.bind(this)}>驳回</Button>*/}
                    </span>
                </div>
                {recheck.reckid ? 
                <div >
                    <div><span style={{fontSize: fontSize, fontWeight: 'bold'}}>复审结果：
                        <span style={recheck.status ? passStyle : rejectStyle }>{ recheck.status ? "通过" : "驳回" }</span> 审核时间：{ recheck.recheck_time }</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                        <span style={{fontSize: fontSize, fontWeight: 'bold', flex: "1 1 50%"}}>审核员</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', lineHeight: '30px', borderTop: '1px solid #e2e7eb'}}>
                        <span style={{flex: "1 1 50%"}}>客服ID：{recheck.reckid || ""}</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', lineHeight: '30px', borderTop: '1px solid #e2e7eb'}}>
                        <span style={{flex: "1 1 50%"}}>姓名：{recheck.name || ""}</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', lineHeight: '30px', borderTop: '1px solid #e2e7eb'}}>
                        <span style={{flex: "1 1 50%"}}>手机号：{recheck.phone || ""}</span>
                    </div>
                    {recheck.description ?
                    <div style={{display: 'flex', justifyContent: 'space-between', lineHeight: '30px', borderTop: '1px solid #e2e7eb'}}>
                        {recheck.status == 0 ?
                        <span style={{flex: "1 1 50%"}}>驳回原因：{recheck.description || ""}</span>
                        : null }
                    </div>
                    : null }
                </div>
                : null }
            </div>
        );
    }
}

IdentifyHistoryTable.propTypes = {
    userInfo: PropTypes.object,
    opperInfo: PropTypes.object
}

IdentifyHistoryTable.defaultProps = {
    userInfo: {},
    recheck: {},
    opperInfo: {}
}