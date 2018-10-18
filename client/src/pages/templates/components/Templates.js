import { connect } from 'dva';
import { Table, Card } from 'antd';

function Projects({ list: dataSource, loading }) {


  const columns = [
    {
      title: '模板名称',
      dataIndex: 'temp_name',
      key: 'temp_name',
    },
    {
      title: '模板id',
      dataIndex: 'temp_id',
      key: 'temp_id',
    },
    {
      title: '模板组件',
      dataIndex: 'temp_components',
      key: 'temp_components',
      render: (text, record) => <span>{Object.values(text).join(', ')}</span>
    },
  ];

  return (
    <div>
      <Card>
        <Table
          loading={loading}
          columns={columns}
          bordered
          dataSource={dataSource}
          rowKey={record => record._id}
          pagination={false}
        />
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  const { list } = state.templates;
  return {
    list,
    loading: state.loading.models.templates,
  };
}

export default connect(mapStateToProps)(Projects);
