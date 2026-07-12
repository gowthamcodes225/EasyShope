const Badge = ({ children, color = "primary" }) => {
  const colors = {
    primary: "bg-primary text-white",
    danger: "bg-red-500 text-white",
    success: "bg-green-500 text-white",
    dark: "bg-black/80 text-white",
  };
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors[color]} shadow-sm`}
    >
      {children}
    </span>
  );
};

export default Badge;