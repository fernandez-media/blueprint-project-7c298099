import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  ogSiteName?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  children?: React.ReactNode; // accepted for backwards-compat, ignored
}

/**
 * Lightweight head manager — replaces react-helmet-async to avoid
 * its known "Cannot read properties of null (reading 'useState')"
 * dedupe issue with Vite. Sets <title>, meta description, canonical,
 * and OG/Twitter tags imperatively on mount; restores previous values on unmount.
 */
const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  const created = !el;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  const prev = el.getAttribute("content");
  el.setAttribute("content", content);
  return () => {
    if (created) el?.remove();
    else if (prev !== null) el?.setAttribute("content", prev);
  };
};

const setCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const created = !el;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  const prev = el.getAttribute("href");
  el.setAttribute("href", href);
  return () => {
    if (created) el?.remove();
    else if (prev !== null) el?.setAttribute("href", prev);
  };
};

export const SEO = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  ogType = "website",
  ogSiteName = "Blueprint Project",
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage,
}: SEOProps) => {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const prevTitle = document.title;
    if (title) document.title = title;
    if (description) cleanups.push(setMeta("description", description));

    // Open Graph
    cleanups.push(setMeta("og:type", ogType, "property"));
    cleanups.push(setMeta("og:site_name", ogSiteName, "property"));
    const finalOgTitle = ogTitle ?? title;
    const finalOgDesc = ogDescription ?? description;
    if (finalOgTitle) cleanups.push(setMeta("og:title", finalOgTitle, "property"));
    if (finalOgDesc) cleanups.push(setMeta("og:description", finalOgDesc, "property"));
    if (ogImage) cleanups.push(setMeta("og:image", ogImage, "property"));
    if (ogUrl) cleanups.push(setMeta("og:url", ogUrl, "property"));

    // Twitter
    cleanups.push(setMeta("twitter:card", twitterCard));
    const finalTwTitle = twitterTitle ?? finalOgTitle;
    const finalTwDesc = twitterDescription ?? finalOgDesc;
    const finalTwImage = twitterImage ?? ogImage;
    if (finalTwTitle) cleanups.push(setMeta("twitter:title", finalTwTitle));
    if (finalTwDesc) cleanups.push(setMeta("twitter:description", finalTwDesc));
    if (finalTwImage) cleanups.push(setMeta("twitter:image", finalTwImage));

    if (canonical) cleanups.push(setCanonical(canonical));
    return () => {
      document.title = prevTitle;
      cleanups.forEach((fn) => fn());
    };
  }, [
    title,
    description,
    canonical,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    ogType,
    ogSiteName,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage,
  ]);

  return null;
};

export default SEO;
