import React from 'react'
import classNames from 'classnames'

interface LoadingSpinnerProps {
  fullScreen?: boolean
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  fullScreen = false,
}) => {
  return (
    <div
      className={classNames(
        'd-flex align-items-center justify-content-center',
        {
          'position-fixed top-0 start-0 w-100 h-100': fullScreen,
        }
      )}
    >
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default LoadingSpinner
