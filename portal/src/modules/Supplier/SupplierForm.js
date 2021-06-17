import React, {Component} from "react";
import {Button, Form, Input, Modal, Select, Switch} from "antd";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import formLayout from "../../core/config/formLayout";
import isEmpty from "../../core/validation/is-empty";
import {toast} from "react-toastify";
import {
    closeSupplierForm,
    createSupplier,
    setUpdateSupplier,
    updateSupplier
} from "../../actions/supplier/supplierAction";

class SupplierForm extends Component {
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
        this.closeSupplierForm = this.closeSupplierForm.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.suppliers.showSupplierForm.modalSupplier !== this.props.suppliers.showSupplierForm.modalSupplier) {
            const {modalSupplier} = this.props.suppliers.showSupplierForm;
            if (!isEmpty(modalSupplier)) {
                this.setState({
                    id: modalSupplier.id,
                    name: modalSupplier.name,
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
            await updateSupplier(this.state.id, data)
                .then(res => {
                    this.props.setUpdateSupplier(res.data);
                    toast.success(`${res.data.name} - Updated`);
                    this.closeSupplierForm()
                })
                .catch(err => {
                    toast.error('Can not updated.');
                    this.setState({errors: JSON.parse(err.response.data.errors), loading: false})
                })
        } else {
            await this.props.createSupplier(data)
                .then(res => {
                    toast.success(`${res.data.name} - Created`);
                    this.closeSupplierForm()
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

    // Close supplier form.
    closeSupplierForm() {
        this.setState({
            id: null,
            name: '',
            errors: {},
            loading: false
        })
        this.props.closeSupplierForm()
    }


    render() {
        const {Option} = Select;
        const {showSupplierForm} = this.props.suppliers;


        return (
            <Modal footer={null}
                   title={this.state.id ? `Update ` : 'Create Supplier'}
                   visible={showSupplierForm.show}
                   maskClosable={false} onCancel={this.closeSupplierForm}>
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

SupplierForm.propTypes = {
    closeSupplierForm: PropTypes.func.isRequired,
    createSupplier: PropTypes.func.isRequired,
    setUpdateSupplier: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    suppliers: state.suppliers
})

export default connect(mapStateToProps,
    {
        closeSupplierForm,
        createSupplier,
        setUpdateSupplier
    })(SupplierForm)
