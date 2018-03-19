import React from "react";
import { List } from "antd";

import { MessageItem } from "./styled/typography";

import AddMessageWithMutation from "./AddMessage";

const MessageList = ({ messages }) => (
  <React.Fragment>
    <AddMessageWithMutation />
    <List
      itemLayout="horizontal"
      dataSource={messages}
      renderItem={message => (
        <List.Item>
          <List.Item.Meta title={<MessageItem>{message.text}</MessageItem>} />
        </List.Item>
      )}
    />
  </React.Fragment>
);

export default MessageList;
