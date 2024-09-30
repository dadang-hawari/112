export default function ButtonPrimary({
  click,
  text,
  className,
  isDisabled = false,
  buttonType = 'button',
}) {
  return (
    <button
      onClick={click}
      disabled={isDisabled}
      type={buttonType}
      className={`${
        isDisabled ? 'cursor-default' : ' hover:bg-secondary'
      } bg-blue-500 text-white mt-10 max-w-[568px] w-full h-12 rounded-md transition-colors ${className}`}
    >
      {text}
    </button>
  );
}
