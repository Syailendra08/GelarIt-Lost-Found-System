
import { Label, TextInput } from "flowbite-react";

export default function FormInput({
  label,
  type,
  placeholder,
}) {
  return (
    <div className="space-y-1">
      {label && (
        <Label
          value={label}
          className="text-[11px] font-semibold text-gray-700"
        />
      )}

      <TextInput
        type={type}
        placeholder={placeholder}
        className="
          rounded-md border border-gray-200 bg-[#faf8ff] py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500
        "
      />
    </div>
  );
}