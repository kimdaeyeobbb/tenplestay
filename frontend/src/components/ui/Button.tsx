import { MouseEvent } from '../../types/Events';

interface ButtonProps {
  borderRadius?: string;
  borderWidth?: number;
  borderColor?: string;
  height: string;
  width: string;
  txtColor?: string;
  bgColor?: string;
  btnTxt: React.ReactNode;
  type: 'submit' | 'reset' | 'button';
  value?: string;
  onClick: (e: MouseEvent) => void;
}

const Button = ({
  borderRadius,
  borderWidth,
  borderColor,
  height,
  width,
  txtColor,
  bgColor,
  btnTxt,
  type,
  value,
  onClick,
}: ButtonProps) => {
  return (
    <>
      <button
        type={type}
        value={value}
        onClick={onClick}
        className={`
        rounded-${borderRadius} 
        border-${borderWidth} 
        border-${borderColor} 
        h-${height} 
        w-${width} 
        text-${txtColor} 
        bg-${bgColor}`}
      >
        {btnTxt}
      </button>
    </>
  );
};

export default Button;
