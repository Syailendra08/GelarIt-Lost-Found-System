export default function FormInput({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
}) {
  return (
    <div className="space-y-1">
       {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-200 bg-[#faf8ff] px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
}