import React from "react";
import { List } from "antd";

import AddMessageWithMutation from "./AddMessage";

const MessageList = ({ messages }) => (
  <React.Fragment>
    <AddMessageWithMutation />
    <List
      itemLayout="horizontal"
      dataSource={messages}
      renderItem={message => (
        <List.Item>
          <List.Item.Meta title={message.text} />
        </List.Item>
      )}
    />
  </React.Fragment>
);

export default MessageList;
