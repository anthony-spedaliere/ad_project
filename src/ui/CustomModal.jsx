import React from "react";
import { Modal } from "antd";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background-color: ${(props) => props.bgColor || "white"};
    color: ${(props) => props.textColor || "black"};
  }

  .ant-modal-footer .ant-btn-primary {
    background-color: ${(props) => props.okBgColor || "#1890ff"};
    border-color: ${(props) => props.okBgColor || "#1890ff"};
    color: ${(props) => props.okTextColor || "white"};
  }

  .ant-btn-default {
    background-color: ${(props) => props.defaultBgColor || "#1890ff"};
    border-color: ${(props) => props.defaultBorderColor || "#1890ff"};
  }

  .ant-modal-footer .ant-btn {
    color: ${(props) => props.cancelTextColor || "rgba(0, 0, 0, 0.85)"};
  }

  .ant-modal-header {
    background-color: ${(props) =>
      props.headerBgColor || "var(--background-color)"};
  }

  .ant-modal-title {
    color: ${(props) => props.headerTextColor || "var(--red-color)"};
  }
`;

const CustomModal = ({
  open,
  onOk,
  onCancel,
  okText,
  cancelText,
  title,
  children,
  bgColor,
  textColor,
  okBgColor,
  okTextColor,
  cancelTextColor,
  headerBgColor,
  headerTextColor,
  defaultBgColor,
  defaultBorderColor,
}) => {
  return (
    <StyledModal
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      bgColor={bgColor}
      textColor={textColor}
      okBgColor={okBgColor}
      okTextColor={okTextColor}
      cancelTextColor={cancelTextColor}
      headerBgColor={headerBgColor}
      headerTextColor={headerTextColor}
      defaultBgColor={defaultBgColor}
      defaultBorderColor={defaultBorderColor}
    >
      {children}
    </StyledModal>
  );
};

export default CustomModal;
