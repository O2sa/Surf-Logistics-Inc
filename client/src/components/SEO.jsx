import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const SEO = () => {
  const { t, i18n } = useTranslation();

  return (
    <HelmetProvider>
      <Helmet>
        {/* English Version */}

        {/* Set current language */}
        <html lang={i18n.language} />
        <link
          rel="alternate"
          href="https://www.surflogistics.com/en"
          // hrefLang="en"
        />
        {/* Dynamically change the title */}
        <title>{t("seo.title")}</title>

        {/* Meta description */}
        <meta name="description" content={t("seo.description")} />

        {/* Keywords */}
        <meta name="keywords" content={t("seo.keywords")} />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={t("seo.ogTitle")} />
        <meta property="og:description" content={t("seo.ogDescription")} />
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content="https://www.surflogistics.com" />
        <meta
          property="og:image"
          content="https://example.com/path-to-image.jpg"
        /> */}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("seo.twitterTitle")} />
        <meta
          name="twitter:description"
          content={t("seo.twitterDescription")}
        />
        <meta
          name="twitter:image"
          content="https://example.com/path-to-image.jpg"
        />

        <meta name="robots" content="index, follow" />
      </Helmet>
    </HelmetProvider>
  );
};

export default SEO;
