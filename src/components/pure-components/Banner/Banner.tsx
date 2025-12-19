import React from 'react'

interface BannerProps {
  title: string
}

const Banner: React.FC<BannerProps> = ({ title }) => (
  <div className="app-banner alert alert-info mb-0">
    {title}
  </div>
)

export default Banner
