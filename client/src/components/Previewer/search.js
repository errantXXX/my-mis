import { Form, Select, Input, Button, Row, Col, Table, Breadcrumb, Radio, Checkbox, DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: () => (
    <span>
      <a>编辑</a>
      <a style={{ color: 'red', marginLeft: 8 }}>删除</a>
    </span>
  ),
}];
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Hello Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '5',
  name: 'Bay Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

export default function Search(props) {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item><a href="">应用中心</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href="">应用列表</a></Breadcrumb.Item>
        <Breadcrumb.Item>当前应用</Breadcrumb.Item>
      </Breadcrumb>
      <Form style={{
        display: props.searchFields.length ? 'block' : 'none',
        border: '1px solid #ebedf0',
        padding: 8, borderRadius: 6,
        margin: '20px auto'
      }}>
        <Row gutter={24}>
          {props.searchFields.map((item, index) => {
            if (item.displayType === 'input') {
              return <Col span={8} key={index}>
                <FormItem style={{ display: 'flex' }}
                  label={item.label}
                >
                  <Input placeholder={`请输入${item.label}`} />
                </FormItem>
              </Col>
            } else if (item.displayType === 'select') {
              return <Col span={8} key={index}>
                <FormItem style={{ display: 'flex' }}
                  label={item.label}
                >
                  <Select placeholder={item.default} style={{ width: 171 }}>
                    {item.extra.map((o, i) => <Option key={o.value} value={o.value}>{o.label}</Option>)}
                  </Select>
                </FormItem>
              </Col>
            } else if (item.displayType === 'checkbox') {
              return <Col span={8} key={index}>
                <FormItem style={{ display: 'flex' }}
                  label={item.label}
                >
                  {item.singlebox ?
                    <Radio.Group>
                      {item.extra.map((o, i) => <Radio key={o.value} value={o.value}>{o.label}</Radio>)}
                    </Radio.Group> :
                    <Checkbox.Group>
                      {item.extra.map((o, i) => <Checkbox key={o.value} value={o.value}>{o.label}</Checkbox>)}
                    </Checkbox.Group>
                  }
                </FormItem>
              </Col>
            } else if (item.displayType === 'datepicker') {
              return <Col span={8} key={index}>
                <FormItem style={{ display: 'flex' }}
                  label={item.label}
                >
                  <DatePicker onChange={() => { }} />
                </FormItem>
              </Col>
            }
          })}
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">Search</Button>
            <Button style={{ marginLeft: 8 }}>
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
      <Table style={{ marginTop: 10, display: props.showFields.length ? 'block' : 'none' }} columns={columns} bordered dataSource={data} size="middle" />
    </div>
  )
}
