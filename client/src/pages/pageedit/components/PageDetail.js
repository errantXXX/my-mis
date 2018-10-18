import { connect } from 'dva';
import { Input, Button, Card, Divider, Form, Tag, Tabs } from 'antd';
import DetailFields from './DetailFields';
import FieldList from './FieldList';
import Previewer from '../../../components/Previewer/index';

const FormItem = Form.Item;
const CheckableTag = Tag.CheckableTag;
const TabPane = Tabs.TabPane;
const tagStyle = { display: 'inline-flex', width: 100, height: 60, justifyContent: 'center', alignItems: 'center', border: '1px solid #ddd' };

function PageDetail({ dispatch, url, selected_components, page_template, page_name, searchFields, showFields, loading, list }) {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  function addShowFields(values) {
    dispatch({
      type: 'pageedit/addShow',
      payload: values
    });
  }
  function changeUrl(e) {
    const value = e.target.value;
    dispatch({
      type: 'pageedit/urlChange',
      payload: value
    });
  }
  function submit() {
    dispatch({
      type: 'pageedit/submit'
    })
  }
  function removeShow(values) {
    dispatch({
      type: 'pageedit/removeShow',
      payload: values
    })
  }
  function handleChange(item, checked) {
    dispatch({
      type: 'pageedit/toggleComponent',
      payload: { item, checked }
    })
  }
  return (
    <div>
      <Card title={'页面名称：' + page_name}>
      <Tabs defaultActiveKey="1" onChange={(k) => {}}>
        <TabPane tab="编辑" key="1">
          <div style={{ maxWidth: 600 }}>
            <h4>区块选择</h4>
            <Divider />
            <div>
              {Object.keys(list).map((item, index) => {
                return (
                  <CheckableTag onChange={checked => handleChange(item, checked)} checked={selected_components.includes(item)} key={index} style={tagStyle}>{list[item]}</CheckableTag>
                )
              })}
            </div>
            <Divider />
            <h4>配置项</h4>
            <Divider />
            <FormItem
              {...formItemLayout}
              label="请求地址"
            >
              <Input onChange={changeUrl} defaultValue={url} />
            </FormItem>
            <Divider />
            {selected_components.includes('showFields') ? <DetailFields onOk={addShowFields} /> : null}
            {Array.isArray(showFields) && showFields.length ?
              <div>
                <Divider />
                <p>已添加字段</p>
                <FieldList type="search" removeItem={removeShow} list={showFields} />
                <Divider />
              </div>
              : null}
          </div>
        </TabPane>
        <TabPane tab="预览" key="2"><Previewer data={{page_template, selected_components, showFields, searchFields}} /></TabPane>
      </Tabs>
        <Button onClick={submit}>确认保存</Button>
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  const { url, page_template, page_name, searchFields, showFields, selected_components, list } = state.pageedit;
  return {
    url: url || '',
    page_template,
    page_name,
    searchFields,
    showFields,
    selected_components,
    list,
    loading: state.loading.models.pageedit,
  };
}

export default connect(mapStateToProps)(PageDetail);
