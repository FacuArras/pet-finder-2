type Props = {
  color;
  children;
  margin;
  type;
  small;
  onClick?;
};

export default function Button({
  color,
  children,
  margin,
  type,
  small,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${color} ${
        small ? "text-md px-2 py-2" : "text-lg px-5 py-3 mx-auto"
      } shadow-xl rounded-md text-white block ${margin}`}
    >
      {children}
    </button>
  );
}
