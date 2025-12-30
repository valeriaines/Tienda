import { useEffect, useState } from "react";

const PageWrapper = ({ children }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      className={`transition-all duration-300 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
      `}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
