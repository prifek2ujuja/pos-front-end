import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Hero } from 'src/components/hero'
import { getNoneLayout } from 'src/components/layout'

export default function Home() {
  const { t } = useTranslation('translation')
  return (
    <>
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>
      <Hero />
    </>
  )
}
Home.getLayout = getNoneLayout
