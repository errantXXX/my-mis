import React, {Component} from 'react'
import {
    Tabs,
    Radio,
    Input,
    Button,
    Card,
    Breadcrumb,
    Icon,
    Select,
    Checkbox,
    Upload,
    message,
    DatePicker,
    Form,
    Table,
    Row,
    Col,
    Modal

} from 'antd';
import styles from '../../../styles/common.less';
import Container from '../../../components/Container';
const FormItem = Form.Item;
import {connect} from 'dva';
/*1 新增 2 编辑 3 查看*/
import inc from './inc';
export default connect((state) => {
    return {
    }
})(Form.create()(class extends Component {
    constructor(props) {
        super(props);
        this.state = inc.initState;
    }    
    renderButton() {
        if (this.props.params.key == 1) {
           return(<Button onClick={this.saveData.bind(this, false)}> 新增</Button>)
        } else if (this.props.params.key == 2) {
            return(<Button onClick={this.saveData.bind(this, true)}>保存</Button>)
        } else {
            return null
        }

    }
    saveData(isEdit) {
        let url = isEdit ? inc.editApi : inc.addApi;
        let text = isEdit ? '修改成功' : '添加成功';
        console.info(this.props.form.getFieldValue('name'));
        this.props.form.validateFields((err, values) => {

        this.props.dispatch({
            type: 'api/postDirect',
            payload: {
                url: url,
                name: '',
                form: values,
            },
            succCallback: (res) => {

                if (res.code == 0) {
                    alert(text)

                } else {
                  
                }
            }
        })  


        });

      

    }
    getData(id) {
        this.props.dispatch({
            type: 'api/getDirect',
            payload: {
                url: inc.listApi,
                name: 'assistantList',
                form: {
                    item_id: id
                },
            },
            succCallback: (res) => {

                if (res.code == 0) {

                    try {
                        this.setState({
                            defaultValue:res.info.users.map(function(ele){
                                let temp = ele.item_id;
                                delete ele.item_id;
                                ele.item_id = temp;
                                return ele;
                            })[0]
                        })
                    } catch (e) {
                        console.info(e);
                    }
                    // this.setState({
                    //   defaultValue:{
                    //       type: res.data.pushType,
                    //       title: res.data.title,
                    //       content: res.data.content,
                    //       url: res.data.url,
                    //       sendTime: monent(res.data.pushTime),
                    //       approveListList: res.data.auditList,
                    //       fileName: res.data.fileName,
                    //       fileLineCount: res.data.fileLineCount,
                    //       fileUrl: res.data.fileUrl
                    //   },
                    //   valueCheckboxNeedDetailUrl: res.data.url != '' ? true : false,

                    // });


                } else {
                    Modal.error({title: '查询失败', content: data.msg});
                }
            }
        })
    }
    render() {
        return(
            <Container location={{pathname: inc.pathName}}>
            <Form style={{
                padding:20
            }}>
                {this.renderForm()}
                {this.renderButton()}
            </Form>
            </Container>);
    }    
    renderForm() {
        let list = []
        let defaultValue = this.state.defaultValue;
        console.info(defaultValue);
        let {getFieldDecorator} = this.props.form;
        let params = this.props.params;
        if (defaultValue!= null) {
                console.info(defaultValue)
                for(var i in  defaultValue) {
                        console.info(defaultValue[i]);
                        if (i != 'op' ){
                            list.push( <FormItem
                                            label= {i}>
                                            {getFieldDecorator(i, {
                                                initialValue:  defaultValue[i]
                                            })(
                                                <Input  style={{flex: 1}} type="text" disabled={params.key == '3'}/>
                                            )}
                            </FormItem>)                                
                        }
                    
                    }

        } else {
            list.push(null);
        }
        return list;

    }
    componentDidMount() {
        console.info(this.props.params);
        if (this.props.params.key != 1) {
            this.getData(this.props.params.id);
        }
    }

}));