type Props = {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function InputField({ type, value, onChange, placeholder }: Props) {
  return (
    <div className="flex flex-col w-full pt-8 text-[17px]">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <hr className="border-red-600 border-1"></hr>
    </div>
  );
}