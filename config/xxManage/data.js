exports.config = {
    name: '菜单',

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
