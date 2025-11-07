import React, { useState } from 'react';

const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help inline-flex items-center"
      >
        {children}
      </div>
      {isVisible && (
        <div className="fixed z-[999999] px-3 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-gray-700 rounded-lg shadow-2xl tooltip pointer-events-none"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: 'auto',
            top: 'auto',
            width: '16rem',
            maxWidth: '90vw'
          }}
        >
          {content}
          <div className="tooltip-arrow absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900 dark:bg-gray-700"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;