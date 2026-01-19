
import React from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title = "Castle Funding | Professional Crypto Prop Trading", 
  description = "Join the elite Castle Funding Program. We offer professional simulation-based crypto futures prop trading evaluations with up to $300k challenges and 90% profit splits.",
  keywords = "Crypto Prop Trading, Bitcoin Futures, Trading Evaluation, Funded Account, $100k Challenge, Castle Funding",
  ogImage = "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200&h=630",
  ogUrl = "https://castlefunding.trade"
}) => {
  return (
    <>
      {/* React 19 will automatically hoist these tags to the <head> */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Indexing Settings */}
      <link rel="canonical" href={ogUrl} />
      <meta name="robots" content="index, follow" />
    </>
  );
};

export default SEO;
