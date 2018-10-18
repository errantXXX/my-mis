import React, {PropTypes, Component} from 'react';
import {Router, Route, IndexRoute, Link} from 'dva/router';
import {Row, Col} from 'antd';
import {connect} from 'dva';
import LoginPage from '../components/LoginPage';
import Container from '../components/Container';
import WaterMark from '../components/WaterMark';
import extraRoute from './extra';
const allPortal = require('./portals');
console.info(allPortal)

let dva;
const requireAuth = (nextState, replace) => {
    if (!dva._store.getState().api || !dva._store.getState().api.token) {
        const token = localStorage.getItem('token'); // eslint-disable-line
        if (token) {
            dva._store.dispatch({
                type: 'api/loginSucc',
                payload: {code: 0, data: {token}},
            })
        } else {
            replace({
                pathname: '/login',
                state: {nextPathname: nextState.location.pathname},
            })
        }
    }
}

const recurPages = (kefu, ret = [], root = '') => {
    kefu.forEach((item, idx) => {
        if (item.type === 'PAGE') {
            ret.push(Object.assign({}, item, {path: `${root}/${item.name}`}))
        } else {
            recurPages(item.children, ret, `${root}/${item.name}`)
        }
    });
    return ret;
}

// 给PAGE添加pah路径，规则为OA.name/PAGE.name
const pageClasses = {}
let pagePortals = {}
let apiList = null;
const needWaterMarkPage = ['closeOrder', 'packetManagement', 'partTimeCountList',
    'idCardAppeal', 'manualIdentify', 'quickIdentify', 'unIDCardPhotoIdentify',
    'identityReview', 'activityRecharge', 'smsVerificationCodeSearch', 'refund',
    'customerInfo', 'cancelIden', 'abnormalRefund', 'orderNumberInfo', 'depositRefresh', 'creditManagement',
    'BlockCycling', 'applyHistory', 'AuditRecord', 'checkstatistics', 'employeeManagement', 'partTimeCountDetail', 'balance',
    'deposit', 'moneyMag', 'tableColumns', 'distribution', 'newSchedule', 'scheduleDetails', 'scheduleFact', 'scheduleList',
    'contract', 'logistics', 'portalbase', 'authApplyHistory', 'licensePlateNum', 'inlandRideOrder', 'inlandRideSafe', 'yueOrder', 'redPacket',
    'moneyPacket','basicInfo', 'register','reviewData','depositOrder','redPacketOrder','refundMgmt','authorManagement','refundChart','outPutMoney'
];
const renderPage = (page) => {
    console.info(page);
    if (!pageClasses[page.name]) {
        pageClasses[page.name] = connect((state) => {
            return {}
        })(class extends Component {
            render() {

                const portals = page.portals.map((portal, idx) => {
                    console.info(portal);
                    if (!(`${page.name}_${portal.name}` in pagePortals)) {
                        pagePortals[`${page.name}_${portal.name}`] =
                            
                                React.createElement(connect((state) => {
                                        return {data: state.portal[portal.name], location: this.props.location}
                                    })(allPortal[portal.portalType]),
                                    Object.assign({}, portal, {key: idx, dispatch: dva._store.dispatch})) 
                    }
                    return pagePortals[`${page.name}_${portal.name}`];
                });
                let pathname = page.path;
                let pagename = page.name;

                return (
                    <Container history={this.context.router}
                               location={this.props.location.pathname != '/' ? this.props.location : {
                                   ...this.props.location,
                                   pathname
                               }}>
                        <Row >
                            <Col >

                                {portals.filter((item) => {
                                    return item
                                })}
                            </Col>
                        </Row>
                    </Container>
                )
            }
        })
    }
    return pageClasses[page.name];
}

export default ({app, history}) => {
    dva = app;
    const kefu = require('./pages');
    const pages = recurPages(kefu);
    console.info(pages);
    const routes = pages.map((item, idx) => {
        const page = renderPage(item);
        return (
            <Route path={item.path} key={idx} component={page} />
        )
    })
    for (var i = 0; i < extraRoute.length; i ++ ) {
        
    }
    routes.push(<Route path="{{path}}"  component={require("{{component}}")} />)
    console.info(routes);                             
    return (
        <Router history={history}>
            {routes}
        </Router>
    );
}
