import { useTranslation } from 'react-i18next'

export default function Interpolation() {
  const { t, i18n } = useTranslation()

  i18n.addResourceBundle(i18n.language, 'translation', {
    key: 'Look! {{model}} go vroom!',
    key_fancy: 'Look! {{car.model}} go vroom!',
  })

  const car = {
    model: 'Tesla',
  }

  return (
    <dl id="interpolation">
      <dt>Interpolation</dt>
      <dd>{t('key', { model: car.model })}</dd>
      <dd>{t('key_fancy', { car })}</dd>
      <dd>{t('key', { replace: { model: car.model } })}</dd>
      <dd>{t('key_fancy', { replace: { car } })}</dd>

      <dt>Interpolation prop missing</dt>
      <dd>{t('key')}</dd>
      <dd> {t('key_fancy', { car: car.model })}</dd>
    </dl>
  )
}
