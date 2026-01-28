import { Helmet } from 'react-helmet-async'
import config from '../../config'

export default function SEO({ 
  title, 
  description, 
  image,
  url,
  type = 'website'
}) {
  const siteTitle = config.app.name
  const siteUrl = config.app.url
  
  const fullTitle = title 
    ? `${title} — ${siteTitle}` 
    : `${siteTitle} — Расширение для кастомизации ВКонтакте`
  
  const defaultDescription = config.app.description
  const finalDescription = description || defaultDescription
  
  // Формируем полный URL для изображения
  const defaultImage = `${siteUrl}/og-image.png`
  const finalImage = image 
    ? (image.startsWith('http') ? image : `${siteUrl}${image}`)
    : defaultImage

  const finalUrl = url 
    ? (url.startsWith('http') ? url : `${siteUrl}${url}`)
    : siteUrl

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${siteTitle} - Расширение для ВКонтакте`} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="ru_RU" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      
      {/* Canonical */}
      <link rel="canonical" href={finalUrl} />
      
      {/* Additional */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content={`${siteTitle} Team`} />
      <meta name="keywords" content="VKify, VK, ВКонтакте, расширение, кастомизация, темы, блокировка рекламы, приватность" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#0077ff" />
      <meta name="msapplication-TileColor" content="#0077ff" />
    </Helmet>
  )
}