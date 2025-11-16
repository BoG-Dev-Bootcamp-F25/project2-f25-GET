type Props = {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function InputField({ type, value, onChange, placeholder }: Props) {
  return (
    <div className="flex flex-col w-full">
      <input 
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <hr className="border-red-500 border-1"></hr>
    </div>
  );
}