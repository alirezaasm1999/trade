import React from "react";
import { Layout, Menu } from "antd";
import { HeartOutlined, ContainerOutlined } from "@ant-design/icons";
import { Route, withRouter, Switch } from "react-router-dom";

const { Content, Sider } = Layout;
import AllLists from "./AllLists";
import Favorite from "./Favorite";

class Dashboard extends React.Component {
  state = {
    collapsed: false,
    count: 0,
    results: [],
    page: 1,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item
              key="1"
              icon={<ContainerOutlined />}
              onClick={() => this.props.history.push("/dashboard")}
            >
              All Lists
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<HeartOutlined />}
              onClick={() => this.props.history.push("/dashboard/Favorites")}
            >
              Favorite
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <div style={{ height: "100%", padding: "1%" }}>
              <Route exact path="/dashboard" component={AllLists} />
              <Route exact path="/dashboard/Favorites" component={Favorite} />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(Dashboard);
