import React, {Component} from "react";
import {Button, Form, Input, Modal, Select, Switch} from "antd";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import formLayout from "../../core/config/formLayout";
import isEmpty from "../../core/validation/is-empty";
import {toast} from "react-toastify";
import {
    closeWarehouseForm,
    createWarehouse,
    setUpdateWarehouse,
    updateWarehouse
} from "../../actions/warehouse/warehouseActions";

class WarehouseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            errors: {},
            loading: false
        }


        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.closeWarehouseForm = this.closeWarehouseForm.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.warehouses.showWarehouseForm.modalWarehouse !== this.props.warehouses.showWarehouseForm.modalWarehouse) {
            const {modalWarehouse} = this.props.warehouses.showWarehouseForm;
            if (!isEmpty(modalWarehouse)) {
                this.setState({
                    id: modalWarehouse.id,
                    name: modalWarehouse.name,
                })
            }
        }
    }

    async onSubmit() {
        const data = {
            name: this.state.name,
        }
        this.setState({loading: true})
        if (this.state.id !== null) {
            await updateWarehouse(this.state.id, data)
                .then(res => {
                    this.props.setUpdateWarehouse(res.data);
                    toast.success(`${res.data.name} - Updated`);
                    this.closeWarehouseForm()
                })
                .catch(err => {
                    toast.error('Can not updated.');
                    this.setState({errors: JSON.parse(err.response.data.errors), loading: false})
                })
        } else {
            await this.props.createWarehouse(data)
                .then(res => {
                    toast.success(`${res.data.name} - Created`);
                    this.closeWarehouseForm()
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

    // Close Warehouse form.
    closeWarehouseForm() {
        this.setState({
            id: null,
            name: '',
            errors: {},
            loading: false
        })
        this.props.closeWarehouseForm()
    }


    render() {
        const {Option} = Select;
        const { showWarehouseForm} = this.props.warehouses;


        return (
            <Modal footer={null}
                   title={this.state.id ? `Update ` : 'Create Warehouse'}
                   visible={showWarehouseForm.show}
                   maskClosable={false} onCancel={this.closeWarehouseForm}>
                <Form {...formLayout} onFinish={this.onSubmit}>
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
                    <Button type="primary" htmlType="submit" loading={this.state.loading}
                            className="ant-btn ant-btn-success mt-2">
                        {this.state.id ? 'Update' : 'Create'}
                    </Button>
                </Form>
            </Modal>
        )
    }
}

WarehouseForm.propTypes = {
    closeWarehouseForm: PropTypes.func.isRequired,
    createWarehouse: PropTypes.func.isRequired,
    setUpdateWarehouse: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    warehouses: state.warehouses
})

export default connect(mapStateToProps,
    {
        closeWarehouseForm,
        createWarehouse,
        setUpdateWarehouse
    })(WarehouseForm)