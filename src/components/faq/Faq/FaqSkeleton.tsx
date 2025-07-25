import React from "react";

const FaqSkeleton: React.FC = () => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div className="placeholder-glow">
            <div className="placeholder col-8"></div>
          </div>
          <div className="placeholder-glow">
            <div className="placeholder col-2"></div>
          </div>
        </div>
        <div className="placeholder-glow mt-2">
          <div className="placeholder col-12"></div>
          <div className="placeholder col-10"></div>
          <div className="placeholder col-8"></div>
        </div>
      </div>
    </div>
  );
};

export default FaqSkeleton;
