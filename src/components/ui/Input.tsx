interface InputProps {
  id: string;
  name: string;
  labelText: string;
  error?: string;
}

export default function Input({ id, name, labelText, error }: InputProps) {
  return (
    <div className="grid space-y-2 relative">
      <label htmlFor={name} className="text-md">
        {labelText}
      </label>
      <input type="text" id={id} name={name} className={`bg-transparent py-2 px-3 border border-baseLightGray rounded-sm ${error ? "border-error" : ""}`} />
      {error && <p className="absolute text-error -bottom-6 text-md">{error}</p>}
    </div>
  );
}
