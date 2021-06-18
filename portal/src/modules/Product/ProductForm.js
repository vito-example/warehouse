import React, {Component} from "react";
import {Button, Row, Col, Form, Input, InputNumber, Modal, Select, Switch, DatePicker} from "antd";
import PropTypes, {element} from "prop-types";
import {connect} from "react-redux";
import formLayout from "../../core/config/formLayout";
import isEmpty from "../../core/validation/is-empty";
import {toast} from "react-toastify";
import {closeProductForm, createProduct, setUpdateProduct, updateProduct} from "../../actions/product/productActions";
import Spinner from "../../components/Spinner/Spinner";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import moment from "moment";

class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            supplier_id: '',
            warehouses: [
                {
                    key: 0,
                    id: null,
                    count: null,
                    date: null
                }
            ],
            warehouses_option: [],
            errors: {},
            loading: false
        }


        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.closeProductForm = this.closeProductForm.bind(this)
        this.changeSupplier = this.changeSupplier.bind(this)
        this.addWarehouse = this.addWarehouse.bind(this)
        this.removeWarehouse = this.removeWarehouse.bind(this)
        this.warehouseChange = this.warehouseChange.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.products.showProductForm.modalProduct !== this.props.products.showProductForm.modalProduct) {
            const {modalProduct, warehouses, suppliers} = this.props.products.showProductForm;
            if (!isEmpty(modalProduct)) {
                let oldWareHouses = [];
                if (modalProduct.warehouses) {
                    modalProduct.warehouses.forEach((el , key) => {
                        oldWareHouses.push({
                            id: el.id,
                            key: key,
                            date: el.pivot.date,
                            count: el.pivot.count
                        })
                    })
                }
                this.setState({
                    id: modalProduct.id,
                    name: modalProduct.name,
                    supplier_id: modalProduct.supplier_id ??  '',
                    warehouses: oldWareHouses ?? this.state.warehouses
                })
            }
        }
    }

    async onSubmit() {
        const data = {
            supplier_id: this.state.supplier_id,
            name: this.state.name,
            warehouses: this.state.warehouses
        }
        this.setState({loading: true})
        if (this.state.id !== null) {
            await updateProduct(this.state.id, data)
                .then(res => {
                    this.props.setUpdateProduct(res.data);
                    toast.success(`${res.data.name} - Updated`);
                    this.closeProductForm()
                })
                .catch(err => {
                    toast.error('Can not updated.');
                    this.setState({errors: JSON.parse(err.response.data.errors), loading: false})
                })
        } else {
            await this.props.createProduct(data)
                .then(res => {
                    toast.success(`${res.data.name} - Created`);
                    this.closeProductForm()
                })
                .catch(err => {
                    toast.error('Can not created.')
                    this.setState({errors: JSON.parse(err.response.data.errors), loading: false})
                })
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    changeSupplier(supplier) {
        this.setState({supplier_id: supplier})
    }

    // Close Product form.
    closeProductForm() {
        this.setState({
            id: null,
            name: '',
            supplier_id: '',
            errors: {},
            loading: false
        })
        this.props.closeProductForm()
    }

    addWarehouse() {
        let warehouses = this.state.warehouses;
        warehouses.push({
            id: null,
            count: null,
            date: null,
            key: this.getArrayMax(warehouses) + 1
        })
        this.setState({warehouses: warehouses})
    }

    removeWarehouse(element) {
        let warehouses = this.state.warehouses.filter(function (el) {
            return el.key !== element.key
        })
        this.setState({warehouses: warehouses})
    }

    getArrayMax(array) {
        return Math.max.apply(Math, array.map(function (el) {
            return el.key;
        }))
    }


    warehouseChange(element, value,attribute) {
        let warehouses = this.state.warehouses
        let foundIndex = warehouses.findIndex(x => x.key === element.key);
        warehouses[foundIndex] = {...warehouses[foundIndex],[attribute]: value};
        if (attribute === 'id') {
            let find = warehouses.find(x => x.id === value)
            if (find.key !== element.key) {
                toast.error('Warehouse already choose');
                return;
            }
        }
        this.setState({warehouses: warehouses})
    }

    render() {
        const {Option} = Select;
        const {showProductForm} = this.props.products;

        const selectSuppliers = [];

        const selectWarehouses = [];

        let content;

        if (showProductForm.loading) {
            content = (
                <Spinner/>
            )
        } else {
            showProductForm.suppliers.forEach(el => {
                selectSuppliers.push(<Option key={el.id} value={el.id}>
                    {el.name}
                </Option>)
            })

            showProductForm.warehouses.forEach(el => {
                selectWarehouses.push(<Option value={el.id} key={el.id + 1000}>{el.name}</Option>)
            })

            content = (
                <Form {...formLayout} onFinish={this.onSubmit}>
                    <Form.Item
                        label="Supplier"
                        hasFeedback
                        validateStatus={this.state.errors.supplier_id ? 'error' : ''}
                        help={this.state.errors.supplier_id ?? ''}
                        style={{
                            marginBottom: 1
                        }}
                    >
                        <Select
                            size="default"
                            allowClear
                            value={this.state.supplier_id}
                            onChange={this.changeSupplier}
                            style={{width: "100%"}}
                            placeholder="Select Supplier"
                        >
                            {selectSuppliers}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='Name'
                        hasFeedback
                        validateStatus={this.state.errors.name ? 'error' : ''}
                        help={this.state.errors.name ?? ''}
                        style={{
                            marginBottom: 1
                        }}
                    >
                        <Input placeholder="Enter Name" name="name" value={this.state.name}
                               onChange={this.onChange} id="error"/>
                    </Form.Item>
                    <Form.List
                        name="warehouses"
                    >
                        {() => (
                            <>
                                <span className='mb-4'>Todo - Same warehouses choose</span>
                                {this.state.warehouses.map((field, index) => (
                                    <Row key={index}>
                                        <Col span={6}>
                                            <Form.Item
                                                label={index === 0 ? 'Warehouse' : ''}
                                                validateStatus={this.state.errors[`warehouses.${index}.id`] ? 'error' : ''}
                                                help={this.state.errors[`warehouses.${index}.id`] ??  ''}
                                                hasFeedback>
                                                <Select
                                                    style={{width: '100%'}}
                                                    size="default"
                                                    name='id'
                                                    onChange={(id) => this.warehouseChange(field,id,'id')}
                                                    allowClear
                                                    placeholder="Select Warehouse"
                                                    key={`warehouse-${field.key}`}
                                                    value={this.state.warehouses[index].id}
                                                >
                                                    {selectWarehouses}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                {...formItemLayout}
                                                label={index === 0 ? 'Count' : ''}
                                                validateStatus={this.state.errors[`warehouses.${index}.count`] ? 'error' : ''}
                                                help={this.state.errors[`warehouses.${index}.count`] ??  ''}
                                                key={`remove-${field.key}`}
                                            >
                                                <InputNumber
                                                             min={1}
                                                             name='count'
                                                             onChange={(id) => this.warehouseChange(field,id,'count')}
                                                             value={this.state.warehouses[index].count}
                                                             placeholder="count" style={{width: '100%'}}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                {...formItemLayout}
                                                label={index === 0 ? 'Date' : ''}
                                                required={false}
                                                validateStatus={this.state.errors[`warehouses.${index}.date`] ? 'error' : ''}
                                                help={this.state.errors[`warehouses.${index}.date`] ??  ''}
                                                key={`date-${field.key}`}
                                            >
                                                <DatePicker
                                                    allowClear={false}
                                                    name="date"
                                                    value={this.state.warehouses[index].date !== null ? moment(this.state.warehouses[index].date, "YYYY/MM/DD") : ''}
                                                    onChange={(_,date) => this.warehouseChange(field,date,'date')}
                                                    onOk={(_,date) => this.warehouseChange(field,date,'date')}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                {...formItemLayout}
                                                required={false}
                                                key={`remove-${field.key}`}
                                            >

                                                {this.state.warehouses.length > 1 ? (
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() => this.removeWarehouse(field)}
                                                    />
                                                ) : null}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={this.addWarehouse}
                                        style={{width: '60%'}}
                                        icon={<PlusOutlined/>}
                                    >
                                        Add Warehouse
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Button type="primary" htmlType="submit" loading={this.state.loading}
                            className="ant-btn ant-btn-success mt-2">
                        {this.state.id ? 'Update' : 'Create'}
                    </Button>
                </Form>

            )
        }

        return (
            <Modal footer={null}
                   title={this.state.id ? `Update ` : 'Create Product'}
                   visible={showProductForm.show}
                   maskClosable={false} onCancel={this.closeProductForm}>
                {content}
            </Modal>
        )
    }
}

ProductForm.propTypes = {
    closeProductForm: PropTypes.func.isRequired,
    createProduct: PropTypes.func.isRequired,
    setUpdateProduct: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    products: state.products
})

export default connect(mapStateToProps,
    {
        closeProductForm,
        createProduct,
        setUpdateProduct
    })(ProductForm)

const formItemLayout = {
    labelCol: {
        xs: {span: 36},
        sm: {span: 6},
    },
    wrapperCol: {
        xs: {span: 36},
        sm: {span: 30},
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 20, offset: 4},
    },
};