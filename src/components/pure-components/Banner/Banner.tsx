import React from 'react'
import styles from './Banner.module.scss'

interface BannerProps {
  title: string
}

const Banner: React.FC<BannerProps> = ({ title }) => (
  <div className={styles.banner}>
    {title}
  </div>
)

export default Banner
