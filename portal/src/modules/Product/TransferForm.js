import React, {Component} from "react";
import {Button, Row, Col, Form, Input, InputNumber, Modal, Select, Switch, DatePicker} from "antd";
import PropTypes, {} from "prop-types";
import {connect} from "react-redux";
import isEmpty from "../../core/validation/is-empty";
import Spinner from "../../components/Spinner/Spinner";
import {closeTransferForm, createTransfer} from "../../actions/transfer/transferActions";
import formLayout from "../../core/config/formLayout";
import moment from "moment";
import {toast} from "react-toastify";

class TransferForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            transfer_from: null,
            transfer_to: null,
            count: '',
            date: null,
            product: {},
            warehouses: [],
            errors: {},
            loading: false
        }


        this.onSubmit = this.onSubmit.bind(this)
        this.closeTransferForm = this.closeTransferForm.bind(this)
        this.transferFromChange = this.transferFromChange.bind(this)
        this.transferToChange = this.transferToChange.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.transfers.showTransferForm.product !== this.props.transfers.showTransferForm.product) {
            const {product, warehouses} = this.props.transfers.showTransferForm;
            if (!isEmpty(product)) {
                this.setState({
                    id: product.id,
                    product: product,
                    warehouses: warehouses
                })
            }
        }
    }

    async onSubmit() {
        const data = {
            transfer_from: this.state.transfer_from,
            transfer_to: this.state.transfer_to,
            date: this.state.date,
            count: this.state.count,
        }
        this.setState({loading: true})
        await this.props.createTransfer(this.state.id,data)
            .then(res => {
                toast.success(`Transfer - Created`);
                this.closeTransferForm()

            })
            .catch(err => {
                console.log(err.response.data)
                toast.error('Can not created.')
                this.setState({loading: false})
                this.setState({errors: JSON.parse(err.response.data.errors), loading: false})
            })
    }


    // Close Transfer form.
    closeTransferForm() {
        this.setState({
            id: null,
            count: '',
            product: {},
            warehouses: [],
            errors: {},
            loading: false
        })
        this.props.closeTransferForm()
    }

    transferFromChange(transferFrom) {
        if (transferFrom === this.state.transfer_to) {
            this.setState({transfer_from: transferFrom, transfer_to: ''})
        } else {
            this.setState({transfer_from: transferFrom})
        }
    }

    transferToChange(transferTo) {
        if (transferTo === this.state.transfer_from) {
            this.setState({transfer_from: '', transfer_to: transferTo})
        } else {
            this.setState({transfer_to: transferTo})
        }
    }

    render() {
        const {Option} = Select;
        const {showTransferForm} = this.props.transfers;

        let content;
        let selectTransferFrom = [];
        let selectTransferTo = [];
        if (!this.state.id) {
            content = (
                <Spinner/>
            )
        } else {
            this.state.product.warehouses.forEach(el => {
                selectTransferFrom.push(<Option key={el.id} value={el.id}>
                    {el.name}
                </Option>)
            })
            this.state.warehouses.forEach(el => {
                selectTransferTo.push(<Option key={el.id} value={el.id}>
                    {el.name}
                </Option>)
            })
            content = (
                <Form {...formLayout} onFinish={this.onSubmit}>
                    <Form.Item
                        label="Transfer From"
                        hasFeedback
                        validateStatus={this.state.errors.transfer_from ? 'error' : ''}
                        help={this.state.errors.transfer_from ?? ''}
                        style={{
                            marginBottom: 1
                        }}
                    >
                        <Select
                            size="default"
                            allowClear
                            value={this.state.transfer_from}
                            onChange={this.transferFromChange}
                            style={{width: "100%"}}
                            placeholder="Select Transfer From"
                        >
                            {selectTransferFrom}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='Count'
                        validateStatus={this.state.errors.count ? 'error' : ''}
                        help={this.state.errors.count ??  ''}
                    >
                        <InputNumber
                                     min={1}
                                     name='count'
                                     onChange={(value) => this.setState({count: value})}
                                     value={this.state.count}
                                     placeholder="count" style={{width: '100%'}}/>
                    </Form.Item>
                    <Form.Item
                        label="Transfer To"
                        hasFeedback
                        validateStatus={this.state.errors.transfer_to ? 'error' : ''}
                        help={this.state.errors.transfer_to ?? ''}
                        style={{
                            marginBottom: 1
                        }}
                    >
                        <Select
                            size="default"
                            allowClear
                            value={this.state.transfer_to}
                            onChange={this.transferToChange}
                            style={{width: "100%"}}
                            placeholder="Select Transfer To"
                        >
                            {selectTransferTo}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='Date'
                        validateStatus={this.state.errors.date ? 'error' : ''}
                        help={this.state.errors.date ??  ''}
                    >
                        <DatePicker
                            allowClear={false}
                            name="date"
                            value={this.state.date !== null ? moment(this.state.date, "YYYY/MM/DD") : ''}
                            onChange={(_,date) => this.setState({date: date})}
                            onOk={(_,date) => this.setState({date: date})}
                        />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={this.state.loading}
                            className="ant-btn ant-btn-success mt-2">
                        Transfer
                    </Button>
                </Form>
            )
        }

        return (
            <Modal footer={null}
                   title={!isEmpty(this.state.product) ? `Create Transfer - ${this.state.product.name} ` : 'Create Transfer'}
                   visible={showTransferForm.show}
                   maskClosable={false} onCancel={this.closeTransferForm}>
                {content}
            </Modal>
        )
    }
}

TransferForm.propTypes = {
    closeTransferForm: PropTypes.func.isRequired,
    createTransfer: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    transfers: state.transfers
})

export default connect(mapStateToProps,
    {
        closeTransferForm,
        createTransfer,
    })(TransferForm)
