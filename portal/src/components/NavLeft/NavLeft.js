import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {Menu} from "antd";
import './NavLeft.scss';
import menuConfig from "../../core/config/menuConfig";
import DynamicIcon from "../DynamicIcon/DynamicIcon";

const {SubMenu, Item} = Menu;

class NavLeft extends Component {
    componentWillMount() {
        const menuNodeTree = this.renderMenu(menuConfig);
        this.setState({
            menuNodeTree,
            pathname: this.props.location.pathname
        });
    }

    renderMenu(data) {
        return data.map((item) => {
                if (item.children) {
                    return (
                        <SubMenu title={
                            <span>
                                    {item.icon && <DynamicIcon type={item.icon}/>}
                                <span>{item.title}</span>
                                </span>
                        }
                                 key={item.key}>
                            {this.renderMenu(item.children)}
                        </SubMenu>
                    );
                }
                return (
                    <Item title={item.title} key={item.key}>
                        {item.isLevel ?
                            <NavLink to={item.key}>
                                {item.icon && <DynamicIcon type={item.icon}/>}
                                <span>{item.title}</span>
                            </NavLink>
                            :
                            <span>
                            {item.icon && <DynamicIcon type={item.icon}/>}
                                <span>{item.title}</span>
                        </span>
                        }
                    </Item>
                );
            }
        );
    }

    render() {
        return (
            <div className="nav-wrapper">
                <div className="logo">
                    <h1 className="logo-title">Warehouse</h1>
                </div>
                <Menu theme="dark" defaultSelectedKeys={[this.state.pathname]}>
                    {this.state.menuNodeTree}
                </Menu>
            </div>
        );
    }
}


export default withRouter(NavLeft);
