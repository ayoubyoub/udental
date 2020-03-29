// Addons
import {map} from "lodash";
import {ToastContainer} from "react-toastify";
import {notifyAdd, notifyEdit, notifyDelete, notifyError} from "../../services/notify";
// React
import React, {Component} from "react";
import PropTypes from "prop-types";
// Addons
import "rc-tabs/assets/index.css";
import Tabs, {TabPane} from "rc-tabs";
import TabContent from "rc-tabs/lib/SwipeableTabContent";
import SwipeableInkTabBar from "rc-tabs/lib/SwipeableInkTabBar";
// Components
import Global from "./Apps/Global";
import Security from "./Apps/Security";
import Users from "./Apps/Users";
import Language from "./Apps/Language";
import Chat from "./Apps/Chat";
import Generator from "./Apps/Generator";
// Semantic
import {Icon} from "semantic-ui-react";
// Begin
/* eslint-disable */
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultSelect: "0",
      key2: 2,
      key3: 3,
      key9: 9,
      key10: 10,
      key11: 11
    };
  }
  render() {
    const { defaultSelect, key2, key3, key9, key10, key11 } = this.state;
    return (
      <div>
        <h4>{this.props.header}</h4>
        <ToastContainer />
        <div>
          <Tabs
            defaultActiveKey={defaultSelect}
            renderTabBar={() => (
              <SwipeableInkTabBar
                pageSize={3}
                speed={10}
                styles={{
                  inkBar: {
                    width: "60px",
                    backgroundColor: "#4c3c4c"
                  }
                }}
              />
            )}
            renderTabContent={() => <TabContent />}
          >
            {map(this.props.content, value => (
              <TabPane
                data-extra="tabpane"
                key={value.key}
                tab={
                  <div data-extra="tab-bar-title">
                    <Icon name={value.icon} /> {value.text}
                  </div>
                }
              >
                {value.key === 0 && (
                  <Global
                    notifyAdd={notifyAdd}
                    notifyDelete={notifyDelete}
                    notifyEdit={notifyEdit}
                    notifyError={notifyError}
                  />
                )}
                {value.key === 1 && (
                  <Security
                    contentStyle={this.props.contentStyle}
                    notifyAdd={notifyAdd}
                    notifyDelete={notifyDelete}
                    notifyEdit={notifyEdit}
                    notifyError={notifyError}
                  />
                )}
                {value.key === key2 && (
                  <Users
                    contentStyle={this.props.contentStyle}
                    notifyAdd={notifyAdd}
                    notifyDelete={notifyDelete}
                    notifyEdit={notifyEdit}
                    notifyError={notifyError}
                  />
                )}
                {value.key >= key3 && value.key <= key9 && (
                  <Generator
                    contentStyle={this.props.contentStyle}
                    notifyAdd={notifyAdd}
                    notifyDelete={notifyDelete}
                    notifyEdit={notifyEdit}
                    notifyError={notifyError}
                    settingOf={value.value}
                  />
                )}
                {value.key === key10 && (
                  <Language
                    contentStyle={this.props.contentStyle}
                    notifyAdd={notifyAdd}
                    notifyDelete={notifyDelete}
                    notifyEdit={notifyEdit}
                    notifyError={notifyError}
                  />
                )}
                {value.key === key11 && (
                  <Chat
                    contentStyle={this.props.contentStyle}
                    notifyAdd={notifyAdd}
                    notifyDelete={notifyDelete}
                    notifyEdit={notifyEdit}
                    notifyError={notifyError}
                  />
                )}
              </TabPane>
            ))}
          </Tabs>
        </div>
      </div>
    );
  }
}
Settings.propTypes = {
  header: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired,
  contentStyle: PropTypes.object.isRequired
};
export default Settings;
