import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button,Alert, Space, Table, Tag} from "antd";
import {withRouter} from "react-router";
import isEmpty from "../../core/validation/is-empty";
import Modal from "antd/es/modal/Modal";
import {
    clearWarehouseSearchQuery,
    deleteWarehouse,
    getWarehouseById,
    getWarehouses, setWarehouseSearchQuery,
    showWarehouseForm
} from "../../actions/warehouse/warehouseActions";
import WarehouseForm from "./WarehouseForm";


class Warehouse extends Component{
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                sorter: true,
            },
            {
                title: 'Name',
                dataIndex: 'name',
                sorter: true,
            },
            {
                title: 'Action',
                dataIndex: '',
                key: 'x',
                render: (element) => <>
                    <Space size="middle">
                        <Link to='' className="ant-dropdown-link"
                              onClick={(event) => this.editWarehouse(event, element)}>Edit</Link>
                        <Link to='' className="ant-dropdown-link"
                              onClick={(event) => this.showDeleteWarehouse(event, element)}>Delete</Link>
                    </Space>
                </>
            },
        ]
        this.state = {
            showDeleteConfirm: false,
            deleteWarehouse: {},
        }
        this.handleTableChange = this.handleTableChange.bind(this)
        this.showDeleteWarehouse = this.showDeleteWarehouse.bind(this)
        this.deleteWarehouse = this.deleteWarehouse.bind(this)
    }

    async deleteWarehouse() {
        !isEmpty(this.state.deleteWarehouse) ?
            await deleteWarehouse(this.state.deleteWarehouse.id)
                .then(res => {
                    this.props.clearWarehouseSearchQuery();
                    this.props.getWarehouses();
                    toast.success(`${res.data.name} - Deleted`);
                    this.setState({showDeleteConfirm: false, deleteWarehouse: {}})
                })
                .catch(err => console.log(err))
            : '';
    }

    showDeleteWarehouse(event, data) {
        event.preventDefault();
        this.setState({showDeleteConfirm: true, deleteWarehouse: data})
    }

    componentDidMount() {
        this.props.getWarehouses();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.warehouses.searchQuery !== this.props.warehouses.searchQuery) {
            this.props.getWarehouses()
        }
    }

    // Show edit warehouse modal
    async editWarehouse(event, data) {
        event.preventDefault()
        await getWarehouseById(data.id)
            .then(res => this.props.showWarehouseForm(res.data))
            .catch(err => toast.error(err.response.data.message))
    }

    handleTableChange(pagination, filters, sorter) {
        let data = {
            current: pagination.current,
            sort: 'id',
            order: 'desc'
        }
        if (!isEmpty(sorter)) {
            if (sorter.order) {
                data = {
                    ...data,
                    sort: sorter.field,
                    order: (sorter.order === 'ascend') ? 'asc' : 'desc'
                }
            }
        }
        this.props.setWarehouseSearchQuery(data)
    }

    render() {
        const {data, pagination} = this.props.warehouses
        return (
            <div className="role">
                <div className="row mb-4 action-container">
                    <div className="col">
                        <Button type="primary mb-2" onClick={() => this.props.showWarehouseForm()}>Create warehouse</Button>
                    </div>
                </div>
                <Table
                    columns={this.columns}
                    rowKey={record => record.id}
                    dataSource={data}
                    pagination={pagination}
                    loading={pagination.loading}
                    onChange={this.handleTableChange}
                />
                <WarehouseForm />
                <Modal
                    title="Delete warehouse"
                    maskClosable={false}
                    visible={this.state.showDeleteConfirm}
                    onOk={this.deleteWarehouse}
                    onCancel={() => this.setState({showDeleteConfirm: false, deleteWarehouse: {}})}
                    okText="Delete"
                    cancelText="Cancel"
                >
                    {isEmpty(this.state.deleteWarehouse) ? '' : (
                        <Alert message={`Are you sure? you want to delete - ${this.state.deleteWarehouse.name}`}
                               type="warning" showIcon/>
                    )}
                </Modal>
            </div>
        )
    }
}

Warehouse.propTypes = {
    getWarehouses: PropTypes.func.isRequired,
    setWarehouseSearchQuery: PropTypes.func.isRequired,
    showWarehouseForm: PropTypes.func.isRequired,
    clearWarehouseSearchQuery: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    warehouses: state.warehouses
})

export default withRouter(connect(mapStateToProps,
    {
        getWarehouses,
        setWarehouseSearchQuery,
        showWarehouseForm,
        clearWarehouseSearchQuery
    })
(Warehouse));
