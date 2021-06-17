import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, Alert, Space, Table, Tag} from "antd";
import {withRouter} from "react-router";
import {
    clearSupplierSearchQuery,
    deleteSupplier,
    getSupplierById,
    getSuppliers,
    setSupplierSearchQuery,
    showSupplierForm
} from "../../actions/supplier/supplierAction";
import isEmpty from "../../core/validation/is-empty";
import SupplierForm from "./SupplierForm";
import Modal from "antd/es/modal/Modal";


class Supplier extends Component {
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
                              onClick={(event) => this.editSupplier(event, element)}>Edit</Link>
                        <Link to='' className="ant-dropdown-link"
                              onClick={(event) => this.showDeleteSupplier(event, element)}>Delete</Link>
                    </Space>
                </>
            },
        ]
        this.state = {
            showDeleteConfirm: false,
            deleteSupplier: {},
        }
        this.handleTableChange = this.handleTableChange.bind(this)
        this.showDeleteSupplier = this.showDeleteSupplier.bind(this)
        this.deleteSupplier = this.deleteSupplier.bind(this)
    }

    async deleteSupplier() {
        !isEmpty(this.state.deleteSupplier) ?
            await deleteSupplier(this.state.deleteSupplier.id)
                .then(res => {
                    this.props.clearSupplierSearchQuery()
                    this.props.getSuppliers();
                    toast.success(`${res.data.name} - Deleted`);
                    this.setState({showDeleteConfirm: false, deleteSupplier: {}})
                })
                .catch(err => console.log(err))
            : '';
    }

    showDeleteSupplier(event, data) {
        event.preventDefault();
        console.log(data)
        this.setState({showDeleteConfirm: true, deleteSupplier: data})
    }

    componentDidMount() {
        this.props.getSuppliers();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.suppliers.searchQuery !== this.props.suppliers.searchQuery) {
            this.props.getSuppliers()
        }
    }

    // Show edit role modal
    async editSupplier(event, data) {
        event.preventDefault()
        await getSupplierById(data.id)
            .then(res => this.props.showSupplierForm(res.data))
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
        this.props.setSupplierSearchQuery(data)
    }

    render() {
        const {data, pagination} = this.props.suppliers
        return (
            <div className="role">
                <div className="row mb-4 action-container">
                    <div className="col">
                        <Button type="primary mb-2" onClick={() => this.props.showSupplierForm()}>Create
                            Supplier</Button>
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
                <SupplierForm/>
                <Modal
                    title="Delete Supplier"
                    maskClosable={false}
                    visible={this.state.showDeleteConfirm}
                    onOk={this.deleteSupplier}
                    onCancel={() => this.setState({showDeleteConfirm: false, deleteSupplier: {}})}
                    okText="Delete"
                    cancelText="Cancel"
                >
                    {isEmpty(this.state.deleteSupplier) ? '' : (
                        <Alert message={`Are you sure? you want to delete - ${this.state.deleteSupplier.name}`}
                               type="warning" showIcon/>
                    )}
                </Modal>
            </div>
        )
    }
}

Supplier.propTypes = {
    getSuppliers: PropTypes.func.isRequired,
    setSupplierSearchQuery: PropTypes.func.isRequired,
    showSupplierForm: PropTypes.func.isRequired,
    clearSupplierSearchQuery: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    suppliers: state.suppliers
})

export default withRouter(connect(mapStateToProps,
    {
        getSuppliers,
        setSupplierSearchQuery,
        showSupplierForm,
        clearSupplierSearchQuery
    })
(Supplier));
