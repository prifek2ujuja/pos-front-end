import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'
import { Hero } from 'src/components/hero'
import { getHeaderLayout } from 'src/components/layout'
import Auth from 'src/state/Auth'

export default function Home() {
  const { t } = useTranslation('translation')
  const { authenticated } = Auth

  if (authenticated.value) {
    return <Navigate to="/dashboard" />
  }

  return (
    <>
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>
      <Hero />
    </>
  )
}
Home.getLayout = getHeaderLayout
