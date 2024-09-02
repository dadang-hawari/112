export default function ButtonPrimary({
  click,
  text,
  className,
  isDisabled = false,
}) {
  return (
    <button
      onClick={click}
      disabled={isDisabled}
      className={`${
        isDisabled ? 'cursor-default' : ' hover:bg-secondary'
      } bg-blue-500 text-white mt-10 max-w-[568px] w-full h-[48px] rounded-2xl transition-colors ${className}`}
    >
      {text}
    </button>
  );
}
