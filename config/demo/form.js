exports.config = {
  desc: 'list',
  addBtn: true,
  exportBtn: true,
  apiPath: '@/api/candidate',
  apiImport: [
    'examPlanStudentsList',
    'examPlanStudentsExport',
    'examPlanStudentsUpdate',
    'schoolAll',
  ],
  extendFormField: [
    {
      field: 'examPlanId',
      value: 'route.query.examPlanId',
    },
  ],
  actionColumn: {
    style: 'button',
    actions: [
      {
        label: '更新考生信息',
        onClick: 'handleUpdate',
        ifShow: true,
        // auth: ['basic_list'],
        injectFn: `
  // 更新考生信息
  async function handleUpdate(record: Recordable) {
    const d = dialog.warning({
      title: '更新考生信息',
      content: '更新考生信息，会同步更新考试项目及重新计算项目成绩，请谨慎操作！',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        d.loading = true;
        return new Promise((resolve) => {
          doUpdate(record).then((res) => {
            d.loading = false;
            console.log(res);
            reloadTable();
            if (res) {
              resolve(res);
            } else {
            }
          });
        });
      },
      onNegativeClick: () => {},
    });
  }
  // 触发更新接口调用
  async function doUpdate(record: Recordable) {
    const { success, data, message } = await examPlanStudentsUpdate({ id: record.id });
    if (!success) {
      Message.error(message || '更新失败');
      return false;
    } else {
      Message.success('更新完成,请实际查看更新数据是否完成，并谨慎后续操作');
      return true;
    }
  }
        `,
      },
      {
        label: '编辑',
        onClick: 'handleEdit',
        toEditPageRouterName: 'basic-info',
        toEditPageParams: 'id',

        auth: ['basic_list'],
      },
      {
        label: '删除',
        onClick: 'handleDelete',
        auth: ['basic_list'],
      },
    ],
  },
  onBeforeMountFn: `
    const { success, data } = await schoolAll();
    if (success) {
      const options = data?.map((item) => ({ label: item.organizationName, value: item.id })) || [];
      schemas.value[0]!.componentProps!.options = options;
    }
  `,
}
