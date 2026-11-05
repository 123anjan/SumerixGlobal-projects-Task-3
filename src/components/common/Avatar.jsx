export default function Avatar({ name, photo }) {
  if (photo) {
    return (
      <img
        className="avatar"
        src={photo}
        alt=""
        width="48"
        height="48"
        loading="lazy"
      />
    );
  }
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span className="avatar avatar-initials" aria-hidden="true">
      {initials}
    </span>
  );
}
