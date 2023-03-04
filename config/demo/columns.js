exports.config = {
  desc: 'columns',
  list: [
    {
      title: '学生姓名',
      key: 'studentName',
      index: 4,
      addIndex: 1,
      field: 'name',
    },
    {
      title: '日期',
      key: 'date',
      index: 4,
      addIndex: 1,
      field: 'date',
      component: 'NDatePicker',
      value: null,
      tableHide: true,
    },
    {
      title: '性别',
      key: 'genderDesc',
      index: 6,
      addIndex: 1,
      field: 'gender',
      component: 'NSelect',
      options: [
        {
          label: '全部',
          value: 1,
        },
        {
          label: '男',
          value: 2,
        },
        {
          label: '女',
          value: 3,
        },
      ],
    },
    {
      title: '头像',
      key: 'picture',
      addIndex: 1,
    },
    {
      title: '学校',
      key: 'schoolName',
      index: 1,
      field: 'schoolName',
      addIndex: 1,
    },
    {
      title: '年级',
      key: 'gradeName',
      index: 2,
      field: 'gradeId',
      component: 'NSelect',
      options: [
        {
          label: '舒适性',
          value: 1,
        },
        {
          label: '经济性',
          value: 2,
        },
      ],
      addIndex: 1,
    },
    {
      title: '班级名称',
      key: 'className',
      index: 3,
      addIndex: 1,
    },
    {
      title: '学籍号',
      key: 'studentCode',
      index: 5,
      addIndex: 1,
    },
    {
      title: '身份证号',
      key: 'idNumber',
      addIndex: 1,
    },
    {
      title: 'IC卡号',
      key: 'icCard',
      addIndex: 1,
    },
    {
      title: '项目',
      key: 'TODO',
    },
    {
      title: '项目状态',
      key: 'TODO',
    },
    {
      title: '项目成绩',
      key: 'TODO',
    },
    {
      title: '得分',
      key: 'TODO',
    },
    {
      title: '总分',
      key: 'TODO',
    },
    {
      title: '检录状态',
      key: 'TODO',
    },
    {
      title: '检录时间',
      key: 'TODO',
    },
    {
      title: '公示状态',
      key: 'TODO',
    },
    {
      title: '公示时间',
      key: 'TODO',
    },
    {
      title: '组号',
      key: 'TODO',
    },
    {
      title: '学生信息更新时间',
      key: 'TODO',
      width: 160,
    },
  ],
}
