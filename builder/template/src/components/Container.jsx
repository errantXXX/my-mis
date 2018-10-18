import React, {Component, PropTypes} from 'react';
import 'antd/dist/antd.css';
import {connect} from 'dva';
import Header from './Header';
import Sider from './Sider';

class Container extends Component {
    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired,
        }
    }

    onMenuSelect(item) {
        this.context.router.push(item.url);
    }

    // backgroundColor: 'rgba(247,247,247)',
    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', overflow: 'auto'}}>
                <div style={{position: 'relative'}}>
                    <Header/>
                </div>
                <div
                    style={{flex: 1, display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: '#f7f7f7'}}>
                    <div style={{width: '240px', height: '100%', overflow: 'auto'}}>
                        <Sider onMenuSelect={this.onMenuSelect.bind(this)} location={this.props.location}/>
                    </div>
                    <div style={{
                        flex: 1,
                        overflow: 'auto',
                        backgroundColor: '#fff',
                        border: '0 solid #E4E4E4',
                        borderRadius: 6,
                        minHeight:480,
                        paddingTop: 10
                    }}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

Container.propTypes = {};

function mapStateToProps(state) {
    return Object.assign({}, state.api);
}

export default connect(mapStateToProps)(Container);
