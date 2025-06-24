import React, { useState } from 'react'
import styles from './profile.module.scss'
import CardWrapper from '@/components/common/CardWrapper'
import SwitchButton from '../common/Button/SwitchButton/SwitchButton'
import { Row, Col, Button, Form, InputGroup } from 'react-bootstrap'
import { useTranslations } from 'next-intl';
import { Eye, EyeOff } from '@/components/common/Icons'
import commonStyles from '../../../assets/scss/admin.module.scss'


const ProfilePage: React.FC = () => {
  const [editPassword, setEditPassword] = useState(true)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const t = useTranslations('common.profile');

  return (
    <CardWrapper title={t('editProfile')}>
      <Form>
        <div className="mb-4">
          <Form.Label className="fw-bold">{t('profileImage')}</Form.Label>
          <div
            className={`d-flex align-items-center gap-3 ${styles.profileImageSection}`}
          >
            <img
              src={
                profileImage || 'https://via.placeholder.com/80x80?text=User'
              }
              alt="Profile"
              className={styles.profileImage}
            />
            <div className={styles.profileUpload}>
              <Form.Control
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                id="profile-upload"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const fileInput = e.target as HTMLInputElement
                  if (fileInput.files && fileInput.files[0]) {
                    setProfileImage(URL.createObjectURL(fileInput.files[0]))
                  }
                }}
              />
              <label htmlFor="profile-upload">
                <Button as="span" variant="primary" className="me-2">
                  {t('uploadPhoto')}
                </Button>
              </label>
              <Button
                variant="outline-secondary"
                onClick={() => setProfileImage(null)}
                type="button"
              >
                {t('removePhoto')}
              </Button>
              <div className="form-text">{t('photoHelp')}</div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="fw-bold mb-2">{t('profileInfo')}</div>
          <Row className="g-3">
            <Col md={6}>
              <Form.Label>
                {t('firstName')}{' '}
                <span className="text-danger">{t('required')}</span>
              </Form.Label>
              <Form.Control defaultValue="Admin" />
            </Col>
            <Col md={6}>
              <Form.Label>
                {t('lastName')}{' '}
                <span className="text-danger">{t('required')}</span>
              </Form.Label>
              <Form.Control defaultValue="Admin" />
            </Col>
            <Col md={6}>
              <Form.Label>
                {t('jobTitle')}{' '}
                <span className="text-danger">{t('required')}</span>
              </Form.Label>
              <Form.Control defaultValue="Admin" />
            </Col>
            <Col md={6}>
              <Form.Label>
                {t('email')}{' '}
                <span className="text-danger">{t('required')}</span>
              </Form.Label>
              <Form.Control defaultValue="admin@admin.com" disabled />
            </Col>
          </Row>
        </div>

        <div className="mb-4">
          <div className="mb-3">
            <SwitchButton
              checked={editPassword}
              onChange={setEditPassword}
              id="editPasswordSwitch"
              label={t('editPassword')}
            />
          </div>
          {editPassword && (
            <Row className="g-3">
              <Col md={6}>
                <Form.Label>
                  {t('password')}{' '}
                  <span className="text-danger">{t('required')}</span>
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    defaultValue="password"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                    className={commonStyles.border}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </Button>
                </InputGroup>
              </Col>
              <Col md={6}>
                <Form.Label>
                  {t('confirmPassword')}{' '}
                  <span className="text-danger">{t('required')}</span>
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showConfirmPassword ? 'text' : 'password'}
                    defaultValue="password"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    tabIndex={-1}
                    className={commonStyles.border}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </Button>
                </InputGroup>
              </Col>
            </Row>
          )}
        </div>

        <div className="text-end">
          <Button variant="primary" type="button" className="px-4">
            {t('save')}
          </Button>
        </div>
      </Form>
    </CardWrapper>
  )
}

export default ProfilePage
