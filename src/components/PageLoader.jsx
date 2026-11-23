import { Spin } from "antd";

// shown while a page's code is loading
const PageLoader = ({ fullScreen = false }) => (
  <div
    className={`flex items-center justify-center ${
      fullScreen ? "h-screen bg-[#0F0B1A]" : "h-[60vh]"
    }`}
  >
    <Spin size="large" />
  </div>
);

export default PageLoader;
