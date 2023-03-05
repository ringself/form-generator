exports.config = {
    name: '商品',

    basicColumns: [
        {
            title: '菜单名称',
            dataIndex: 'name',
            width: 200,
            align: 'left',
        },
        {
            title: '图标',
            dataIndex: 'icon',
            width: 50,
            customRender: `({ record }) => {
                return h(Icon, { icon: record.icon })
            },`
        },
        {
            title: '权限标识',
            dataIndex: 'permission',
            width: 180,
        },
        {
            title: '组件',
            dataIndex: 'component',
        },
        {
            title: '排序',
            dataIndex: 'sort',
            width: 50,
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 80,
            customRender: `({ record }) => {
                const status = record.status
                const enable = ~~status === 0
                const color = enable ? 'green' : 'red'
                const text = enable ? '启用' : '停用'
                return h(Tag, { color: color }, () => text)
            },`
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 180,
        }
    ],

    searchFormSchemas: [
        {
            field: 'keyword',
            label: '关键字',
            component: 'Input',
            componentProps: {
                placeholder: '请输入名称/编码',
            },
            colProps: { span: 8 }
        },
        {
            field: 'startDate',
            label: '起始时间',
            component: 'DatePicker',
            componentProps: {
                style: {
                    width: '100%'
                }
            },
            colProps: { span: 8 }
        },
        {
            field: 'endDate',
            label: '截止时间',
            component: 'DatePicker',
            componentProps: {
                style: {
                    width: '100%'
                }
            },
            colProps: { span: 8 }
        }
    ],

    tableActions: [
        {
            label: '编辑',
            // icon: 'clarity:note-edit-line',
            actionHandler: 'handleEdit',
            actionHandlerContent: `
                async function handleEdit(record: any) {
                    // TODO 此处加入编辑点击操作的逻辑
                    console.log(record)
                }
            `,
            onClick: `options.handleEdit.bind(null, record)`
        },
        {
            icon: 'ant-design:delete-outlined',
            color: 'error',
            actionHandler: 'handleDel',
            actionHandlerContent: `
                async function handleDel(record: any) {
                    // TODO 此处加入删除点击操作的逻辑
                    console.log(record)
                }
            `,
            popConfirm: {
                title: '是否确认删除',
                confirm: `options.handleDel.bind(null, record)`
            }
        }
    ]
}
