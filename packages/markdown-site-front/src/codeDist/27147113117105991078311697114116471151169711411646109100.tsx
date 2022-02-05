import React from "react";
import { Dialog, Button } from "zent";

const { openDialog } = Dialog;

const Demo: React.FC = () => {
  const open = () => {
    openDialog({
      title: "title1100",
      children: <div>Dialog</div>,
    });
  };

  return (
    <Button type="primary" onClick={open}>
      点击打开弹窗btn1100
    </Button>
  );
};

export default Demo;