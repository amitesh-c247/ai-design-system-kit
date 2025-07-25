import ContentLoader from "react-content-loader";

const FaqSkeleton = () => (
  <div style={{ marginBottom: 24 }}>
    <ContentLoader
      height={60}
      width="100%"
      speed={2}
      backgroundColor="var(--input)"
      foregroundColor="var(--accent)"
      style={{ width: "100%" }}
    >
      <rect x="0" y="8" rx="6" ry="6" width="60%" height="16" />
      <rect x="0" y="32" rx="4" ry="4" width="90%" height="12" />
      <rect x="0" y="48" rx="4" ry="4" width="80%" height="10" />
    </ContentLoader>
  </div>
);

export default FaqSkeleton;
