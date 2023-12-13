import { ChangeEvent } from '../../types/Events';

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password';
  label: string;
  labelTxt: string;
  value?: string | number;
  name: string;
  placeholder: string;
  error: boolean;
  showSearchIcon?: boolean;
  onChange?: (e: ChangeEvent) => void;
  width?: string;
  height?: string;
}

const Input = ({
  type,
  label,
  labelTxt,
  value,
  name,
  placeholder,
  error,
  showSearchIcon = false,
  onChange,
}: InputProps) => {
  return (
    <div className="flex lg:ml-auto max-lg:w-full">
      <div className="flex xl:w-80 max-xl:w-full bg-white  border-grayscale-600 border-2 px-6 py-3 space-x-2 rounded-xl outline outline-transparent focus-within:outline-[#007bff]">
        {showSearchIcon && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192.904 192.904"
            width="16px"
            className="cursor-pointer fill-grayscale-400"
          >
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
          </svg>
        )}
        <div className="items-center">
          <label htmlFor={label}>{labelTxt}</label>
          <input
            type={type}
            id={label}
            value={value}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            className="w-full text-sm bg-transparent rounded outline-none placeholder-grayscale-400"
          />
        </div>
        {error && (
          <p className="bg-error-primary">Input 영역은 비어있을 수 없습니다</p>
        )}
      </div>
    </div>
  );
};

export default Input;
