import React from "react";
import { Grid } from "zent";

const Test: React.FC = () => {
  const columns = [{
    title: "姓名",
    name: "name"
  }]

  const datasets = [{
    name: "xxx",
    id: 1
  }];


  return <div>
    Test22
    <Grid columns={columns} datasets={datasets} />
  </div>;
};

export default Test;