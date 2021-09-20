import React from "react";
import { Typography } from "antd";

import "../css/StatsPanel.css";

const StatsPanel = ({ late, pending, done }) => {
  const { Title, Paragraph } = Typography;

  return (
    <div className="stats-panel">
      <div className="stats">
        <div className="stats-text">
          <Typography>
            <Title level={1}>{late}</Title>
            <Paragraph>
              To do
            </Paragraph>
          </Typography>
        </div>
      </div>
			<div className="stats">
        <div className="stats-text">
          <Typography>
            <Title level={1}>{pending}</Title>
            <Paragraph>
              Late
            </Paragraph>
          </Typography>
        </div>
      </div>
			<div className="stats">
        <div className="stats-text">
          <Typography>
            <Title level={1}>{done}</Title>
            <Paragraph>
              Done
            </Paragraph>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
