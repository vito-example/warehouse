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
    clearProductSearchQuery,
    deleteProduct, getCreateProduct, getEditProduct,
    getProductById,
    getProducts,
    setProductSearchQuery,
    showProductForm
} from "../../actions/product/productActions";
import ProductForm from "./ProductForm";
import TransferForm from "./TransferForm";
import {getCreateTransfer, showTransferForm} from "../../actions/transfer/transferActions";


class Product extends Component{
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
                              onClick={(event) => this.transferProduct(event, element)}>Transfer</Link>
                        <Link to='' className="ant-dropdown-link"
                              onClick={(event) => this.editProduct(event, element)}>Edit</Link>
                        <Link to='' className="ant-dropdown-link"
                              onClick={(event) => this.showDeleteProduct(event, element)}>Delete</Link>
                    </Space>
                </>
            },
        ]
        this.state = {
            showDeleteConfirm: false,
            deleteProduct: {},
        }
        this.handleTableChange = this.handleTableChange.bind(this)
        this.showDeleteProduct = this.showDeleteProduct.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)
        this.showCreateForm = this.showCreateForm.bind(this)
        this.transferProduct = this.transferProduct.bind(this)
    }

    async deleteProduct() {
        !isEmpty(this.state.deleteProduct) ?
            await deleteProduct(this.state.deleteProduct.id)
                .then(res => {
                    this.props.clearProductSearchQuery();
                    this.props.getProducts();
                    toast.success(`${res.data.name} - Deleted`);
                    this.setState({showDeleteConfirm: false, deleteProduct: {}})
                })
                .catch(err => console.log(err))
            : '';
    }

    async transferProduct(event, data)
    {
        event.preventDefault();
        await getCreateTransfer(data.id)
            .then(res => this.props.showTransferForm(res))
            .catch(err => toast.error(err.response.data.message))
    }

    showDeleteProduct(event, data) {
        event.preventDefault();
        this.setState({showDeleteConfirm: true, deleteProduct: data})
    }

    componentDidMount() {
        this.props.getProducts();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.products.searchQuery !== this.props.products.searchQuery) {
            this.props.getProducts()
        }
    }

    // Show edit product modal
    async editProduct(event, data) {
        event.preventDefault()
        await getEditProduct(data.id)
            .then(res => this.props.showProductForm(res))
            .catch(err => toast.error(err.response.data.message))
    }

    // Show create product modal
    async showCreateForm(event, data) {
        event.preventDefault()
        await getCreateProduct()
            .then(res => this.props.showProductForm(res))

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
        this.props.setProductSearchQuery(data)
    }

    render() {
        const {data, pagination} = this.props.products
        return (
            <div className="role">
                <div className="row mb-4 action-container">
                    <div className="col">
                        <Button type="primary mb-2" onClick={this.showCreateForm}>Create Product</Button>
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
                <Modal
                    title="Delete Product"
                    maskClosable={false}
                    visible={this.state.showDeleteConfirm}
                    onOk={this.deleteProduct}
                    onCancel={() => this.setState({showDeleteConfirm: false, deleteProduct: {}})}
                    okText="Delete"
                    cancelText="Cancel"
                >
                    {isEmpty(this.state.deleteProduct) ? '' : (
                        <Alert message={`Are you sure? you want to delete - ${this.state.deleteProduct.name}`}
                               type="warning" showIcon/>
                    )}
                </Modal>
                <ProductForm />
                <TransferForm />
            </div>
        )
    }
}

Product.propTypes = {
    getProducts: PropTypes.func.isRequired,
    setProductSearchQuery: PropTypes.func.isRequired,
    showProductForm: PropTypes.func.isRequired,
    clearProductSearchQuery: PropTypes.func.isRequired,
    showTransferForm :PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    products: state.products
})

export default withRouter(connect(mapStateToProps,
    {
        getProducts,
        setProductSearchQuery,
        showProductForm,
        clearProductSearchQuery,
        showTransferForm
    })
(Product));