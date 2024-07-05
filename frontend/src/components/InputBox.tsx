interface InputBoxProps {
  label: string;
  value: string | undefined;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const InputBox = ({ label, placeholder, type, onChange }: InputBoxProps) => {
  return (
    <div className="w-full">
      <div className="text-base font-bold">{label}</div>
      <input
        placeholder={placeholder}
        className="border-2 rounded-md p-1.5 w-full border-gray-300"
        onChange={onChange}
        type={type}
      />
    </div>
  );
};

export default InputBox;
