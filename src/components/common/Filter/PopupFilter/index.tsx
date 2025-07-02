import React, { useState, useRef } from 'react';
import { useIntl } from 'react-intl';
import { Popover, Button, Stack, OverlayTrigger } from 'react-bootstrap';
import FilterButton from '../FilterButton';
import styles from './styles.module.scss';

interface PopupFilterProps {
  label: string;
  labelCount?: number;
  labelName?: string;
  active?: boolean;
  onApply?: () => void;
  onClear: () => void;
  isDisabled?: boolean;
  children: React.ReactNode;
}

const PopupFilter: React.FC<PopupFilterProps> = ({
  label,
  labelCount,
  labelName,
  active,
  onApply,
  onClear,
  children,
  isDisabled = false,
}) => {
  const { formatMessage } = useIntl();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const hideAndApply = () => {
    setIsPopupVisible(false);
    onApply?.();
  };

  const hideAndClear = () => {
    setIsPopupVisible(false);
    onClear();
  };

  const popover = (
    <Popover id="popup-filter" className={styles.popover}>
      <Popover.Body>
        <div className={styles.content}>{children}</div>
        <div className={styles.footer}>
          <Stack direction="horizontal" gap={2}>
            <Button variant="outline-secondary" onClick={hideAndClear}>
              {formatMessage({ id: 'generic.clear' })}
            </Button>
            {onApply && (
              <Button variant="primary" onClick={hideAndApply} disabled={isDisabled}>
                {formatMessage({ id: 'generic.apply' })}
              </Button>
            )}
          </Stack>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      show={isPopupVisible}
      onToggle={setIsPopupVisible}
      overlay={popover}
    >
      <FilterButton
        labelCount={labelCount}
        labelName={labelName}
        labelBase={label}
        active={active}
      />
    </OverlayTrigger>
  );
};

export default PopupFilter;
