import { Form, Select, Input, Button, Breadcrumb, DatePicker, Radio, Checkbox } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
}
export default function Search(props) {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item><a href="">应用中心</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href="">应用列表</a></Breadcrumb.Item>
        <Breadcrumb.Item>当前应用</Breadcrumb.Item>
      </Breadcrumb>
      <Form style={{ margin: '20px auto' }} onSubmit={() => { }}>
        {
          props.showFields.map((item, index) => {
            if (item.displayType === 'input') { // input
              return <FormItem key={index}
                {...formItemLayout}
                label={item.label}
              >
                <Input placeholder={`请输入${item.label}`} />
              </FormItem>
            } else if (item.displayType === 'select') { // select
              return <FormItem key={index}
                {...formItemLayout}
                label={item.label}
              >
                <Select placeholder={item.default} style={{ width: 171 }}>
                  {item.extra.map((o, i) => <Option key={o.value} value={o.value}>{o.label}</Option>)}
                </Select>
              </FormItem>
            } else if (item.displayType === 'textarea') { // textarea
              return <FormItem key={index}
                {...formItemLayout}
                label={item.label}
              >
                <TextArea autosize={{ minRows: 3, maxRows: 6 }} placeholder={`请输入${item.label}`} />
              </FormItem>
            } else if (item.displayType === 'datepicker') { // datepicker
              return <FormItem key={index}
                {...formItemLayout}
                label={item.label}
              >
                <DatePicker onChange={() => { }} />
              </FormItem>
            } else if (item.displayType === 'checkbox') { // checkbox
              return <FormItem key={index}
                {...formItemLayout}
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
            }
          })
        }
        <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 14, offset: 4 }}>
          <Button type="primary">确认修改</Button>
        </FormItem>
      </Form>
    </div>
  )
}
