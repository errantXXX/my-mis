import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from "dva/router";
import styles from '../../../styles/common.less';
import AutoFieldComponent from "../../../components/AutoFieldComponents";
import AutoBtnComponent from "../../../components/AutoBtnComponent";
import Base from "../../../utils/base";
import {Row, Table} from 'antd'


/***************/
import inc from './inc'
let pushConfig = inc.searchHead;
let jumpUrl = inc.crud_url;
/***************/
class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign(inc.initState,{
            tableInit: false
        });

    }
    goEdit(row) {

        this.props.dispatch(
            routerRedux.push({
                pathname: jumpUrl + '/2/' + row.item_id,
            })
        );
    }
    goDelete(row) {
        let dialog = confirm("确认删除？")
        if (dialog) {
            this.props.dispatch({
                type: 'api/post',
                payload: {
                    url: 'assistant/push/delete',
                    name: 'assistantDelete',
                    form: {
                        pushId: row.pushId
                    }
                },
                succCallback: (res) => {
                    console.info(res.data);
                    if (res.code == 200) {
                        this.getList()
                    } else {
                        Base.ModFailSupply("操作失败", res.msg, res.data);
                    }
                }
            });
        }

    }
    goDetail(row) {
        this.props.dispatch(
            routerRedux.push({
                 pathname: jumpUrl +  '/3/' + row.item_id,
            })
        );
    }

    componentWillMount() {
        if (inc.tableHeader.length == 3){
            inc.tableHeader.push({
                name: '操作',
                width: 150,
                dataIndex: 'op',
                render: (text, row) => {
                    console.info(text);
                    return(
                        <div>
                        <a onClick={this.goEdit.bind(this, row)}>编辑</a>  <a onClick={this.goDetail.bind(this, row)}>查看</a> 
                        </div>
                        )
                }         
            })
            this.setState({
                tableInit: true
            })            
        }

        this.getList();  
    }

    getList = () => {
        const {helperStore} = this.props;
        let form = {
           
        };
        console.info('form');
        console.info(helperStore.searchForm);

        this.props.dispatch({
            type: 'api/getDirect',
            payload: {
                url: inc.api,
                name: 'assistantList',
                form: helperStore.searchForm
            },
            succCallback: (res) => {
                console.info('list')
                console.info(res.info.users);
                if (res.code == 0) {
                    this.setState({
                        data: res.info.users,
                        total: res.info.users.length,
                        current: 1,
                    }, (state) => {
                        console.info(this.state);
                    });


                } else {
                    Base.ModFailSupply("操作失败", res.msg, res.data);
                }
            }
        })
    }

    render() {
        console.info('do render')
        return (
            <div>
                <div className={styles.header}>
                    {this.renderSearch()}
                    {this.renderTable()}
                </div>
            </div>
        );
    }

    renderSearch() {
        return (
            <div className={styles.serchWrap} style={{padding: '20px', margin: 0}}>
                {this.renderSearchField()}

            </div>
        );
    }

    // renderSearchField
    renderSearchField() {
        console.info('render');
        const {helperStore} = this.props;
        pushConfig.map(function(ele,index){
            console.info(ele);
            ele.value = helperStore.searchForm[ele.field];
        })
        return (
            <div>
                <Row key={1} className={styles.comSearsh} type="flex" justify="space-between">
                    <AutoFieldComponent
                        className={styles.comField}
                        callBack={this.receiveData}
                        queryFields={pushConfig}
                        onPressEnter={this.handleSearchSubmit}
                    />
                    {this.renderCreate()}
                    {this.renderBtn()}
                </Row>
            </div>
        );
    }

    receiveData = data => {
        const {helperStore} = this.props;
        helperStore.searchForm = Object.assign(helperStore.searchForm, data);
        console.info(helperStore.searchForm);
        this.forceUpdate();
    }

    // renderbtn
    renderBtn() {
        const obj = [
            {
                id: 1,
                icon: "search",
                style: {},
                onClick: this.handleSearchSubmit.bind(this),
                href: "",
                type: "primary",
                name: "查询 ",
                disabled: false
            }
        ];
        return (<div><AutoBtnComponent btnData={obj}/></div>);
    }

    renderCreate() {
        const obj = [
            {
                id: 1,
                icon: "plus",
                style: {},
                onClick: this.createPush,
                href: "",
                type: "primary",
                name: "新建",
                disabled: false
            }
        ];
        return (<div><AutoBtnComponent btnData={obj}/></div>);
    }

    //新建
    createPush = () => {
        this.props.dispatch(
            routerRedux.push({
                pathname: jumpUrl + '/1/1'

            })
        );
    }

    //查询按钮
    handleSearchSubmit() {
        this.getList();
    }

    renderTable() {
        //const { data } = this.props
        console.info('renderTable');
        console.info(inc.tableHeader);
        let data = [];
        if (this.state.data.length > 0) {
            data = this.state.data;
        }
        console.info(data);

        const {current, total} = this.state
        return (
            <div style={{marginTop: 30,padding:20}}>
                <Table
                    className={styles.comTable}
                    columns={Base.TabColumns(inc.tableHeader)}
                    dataSource={data}
                    bordered
                    pagination={{
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} 条 共 ${total} 条`,
                        current,
                        total,
                        defaultPageSize: 10,
                        onChange: this.handleTableChange.bind(this)
                    }}
                />
            </div>
        );
    }

    // 表格翻页
    handleTableChange = page => {

        this.setState({
            current: page,
        }, () => {
            this.getList()
        });
    };
}

const mapStateToProps = (state) => {
    return {
        helperStore: state[inc.helperStore],
  
    }
};
export default connect(mapStateToProps)(SearchPage)
