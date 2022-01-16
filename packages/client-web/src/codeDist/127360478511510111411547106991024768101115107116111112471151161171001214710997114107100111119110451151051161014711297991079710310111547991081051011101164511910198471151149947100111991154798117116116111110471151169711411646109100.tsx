import React from "react";
import { Grid } from "zent";

const Demo: React.FC = () => {
  const columns = [{
    title: "姓名",
    name: "name"
  }]

  const datasets = [{
    name: "xxx",
    id: 1
  }];


  return <div>
    BtnTest22
    <Grid columns={columns} datasets={datasets} />
  </div>;
};

export default Demo;