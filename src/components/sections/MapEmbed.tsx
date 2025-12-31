export default function MapEmbed({ src }: { src: string }) {
  return (
    <div className="w-full mt-4">
      <iframe
        src={src}
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}