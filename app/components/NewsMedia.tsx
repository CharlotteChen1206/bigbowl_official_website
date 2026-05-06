type NewsMediaProps = {
  src: string;
  title: string;
};

export function NewsMedia({ src, title }: NewsMediaProps) {
  return (
    <iframe
      className="news-media-frame"
      src={`${src}#view=FitH`}
      title={title}
      loading="lazy"
    />
  );
}
