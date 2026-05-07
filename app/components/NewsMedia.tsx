type NewsMediaProps = {
  src: string;
  title: string;
};

export function NewsMedia({ src, title }: NewsMediaProps) {
  const isPdf = src.toLowerCase().endsWith(".pdf");

  if (!isPdf) {
    return <img className="news-media-frame" src={src} alt={title} loading="lazy" />;
  }

  return (
    <iframe
      className="news-media-frame"
      src={`${src}#view=FitH`}
      title={title}
      loading="lazy"
    />
  );
}
