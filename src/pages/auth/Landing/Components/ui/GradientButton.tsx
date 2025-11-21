type GradientButtonProps = {
  label: string;
  className?: string;
  onClick?: () => void;
};

export function GradientButton({
  label,
  className = '',
  onClick,
}: GradientButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full bg-gradient-to-r from-[#64ee61] to-[#32b8d3] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-lime-200/60 transition hover:shadow-xl ${className}`}
    >
      {label}
    </button>
  );
}
