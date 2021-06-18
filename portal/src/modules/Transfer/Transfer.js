import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, Alert, Space, Table, Tag} from "antd";
import {withRouter} from "react-router";
import isEmpty from "../../core/validation/is-empty";
import {getTransfers, setTransferSearchQuery} from "../../actions/transfer/transferActions";


class Transfer extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                sorter: true,
            },
            {
                title: 'Product',
                dataIndex: 'product',
                render: product => product.name
            },
            {
                title: 'Transfer From',
                dataIndex: 'from_warehouse',
                render: from_warehouse => from_warehouse.name
            },
            {
                title: 'Count',
                dataIndex: 'count',
            },
            {
                title: 'Transfer To',
                dataIndex: 'to_warehouse',
                render: to_warehouse => to_warehouse.name
            },

        ]
        this.handleTableChange = this.handleTableChange.bind(this)
    }

    componentDidMount() {
        this.props.getTransfers();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.transfers.searchQuery !== this.props.transfers.searchQuery) {
            this.props.getTransfers()
        }
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
        this.props.setTransferSearchQuery(data)
    }

    render() {
        const {data, pagination} = this.props.transfers
        return (
            <div className="transfer">
                <Table
                    columns={this.columns}
                    rowKey={record => record.id}
                    dataSource={data}
                    pagination={pagination}
                    loading={pagination.loading}
                    onChange={this.handleTableChange}
                />
            </div>
        )
    }
}

Transfer.propTypes = {
    getTransfers: PropTypes.func.isRequired,
    setTransferSearchQuery: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    transfers: state.transfers
})

export default withRouter(connect(mapStateToProps,
    {
        getTransfers,
        setTransferSearchQuery,
    })
(Transfer));
