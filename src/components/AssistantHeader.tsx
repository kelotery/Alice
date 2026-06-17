import React from "react";

const AssistantHeader: React.FC = () => (
  <div className="assistant-header">
    <div className="assistant-header__avatar">
      <svg width="82" height="82" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="43" cy="43" r="43" fill="#ffffff" />
        <circle cx="43" cy="43" r="40" fill="#111111" />
        <ellipse cx="43" cy="48" rx="22" ry="14" fill="#ffffff" opacity="0.12" />
        <ellipse cx="43" cy="55" rx="14" ry="7" fill="#ffffff" opacity="0.18" />
        <circle cx="33" cy="39" r="4" fill="#ffffff" />
        <circle cx="53" cy="39" r="4" fill="#ffffff" />
        <path d="M38 46 Q43 52 48 46" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M35 24 Q36 16 40 12" stroke="#111111" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M51 24 Q50 16 46 12" stroke="#111111" strokeWidth="5" strokeLinecap="round" fill="none" />
        <rect x="31" y="62" width="24" height="5" rx="2.5" fill="#d32f2f" />
        <circle cx="43" cy="62" r="10" fill="#d32f2f" />
        <path d="M34 63 L43 65 L52 63" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
    <div className="assistant-header__text">
      <h1 className="assistant-header__title">Marvis</h1>
      <p className="assistant-header__subtitle">💬 马维斯 为你24小时随时在线</p>
    </div>
  </div>
);

export default AssistantHeader;
