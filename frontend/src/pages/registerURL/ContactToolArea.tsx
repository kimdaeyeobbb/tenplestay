import { useState } from 'react';
import ContactToolHeader from './ContactToolHeader';

interface ContactToolAreaProps {
  onPhoneNumberChange: (phoneNumber: string, isChecked: boolean) => void;
  onEmailChange: (email: string, isChecked: boolean) => void;
}

const ContactToolArea: React.FC<ContactToolAreaProps> = ({
  onPhoneNumberChange,
  onEmailChange,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const [isSmsChecked, setIsSmsChecked] = useState(false);

  const handleSmsCheckboxChange = () => {
    setIsSmsChecked(!isSmsChecked);
    onPhoneNumberChange(phoneNumber, !isSmsChecked);
  };

  const [isEmailChecked, setIsEmailChecked] = useState(false);

  const handleEmailCheckboxChange = () => {
    setIsEmailChecked(!isEmailChecked);
    onEmailChange(email, !isEmailChecked); // 부모 컴포넌트에게 이메일이 체크되었는지를 전달
  };

  return (
    <section className="self-stretch h-20 flex-col justify-start items-start gap-4 flex">
      <ContactToolHeader />

      <div className="self-stretch justify-start items-start gap-12 inline-flex">
        <div className="grow shrink basis-0 flex-col justify-center items-start gap-4 inline-flex">
          <div className="justify-start items-center gap-4 inline-flex cursor-pointer">
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-sm border-2 border-slate-500 ${
                isSmsChecked ? 'bg-brand-primary' : ''
              } ${isSmsChecked ? 'border-none' : 'border-2'}`}
              onClick={handleSmsCheckboxChange}
            >
              {isSmsChecked && (
                <img
                  src="assets/images/icon/check.svg"
                  className="w-4 h-4 text-white absolute"
                />
              )}
            </div>
            <label
              htmlFor="sms-checkbox"
              className="text-grayscale-300
                text-base
                font-normal
                font-['SUIT']
                leading-7
                tracking-tight
                "
            >
              문자 메시지 수신
            </label>
          </div>
          <div
            className={`self-stretch h-[52px] bg-slate-600 rounded-lg justify-start items-center inline-flex`}
          >
            <input
              type="text"
              placeholder="01012345678"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                onPhoneNumberChange(e.target.value, isSmsChecked);
              }}
              className={`grow self-stretch px-4 py-3 rounded-lg basis-0 text-slate-400 bg-slate-600 text-lg font-medium font-['SUIT'] leading-7 tracking-tight`}
            />
          </div>
        </div>
        <div className="grow shrink basis-0 flex-col justify-center items-start gap-4 inline-flex">
          <div className="w-[167.67px] h-7 justify-start items-center gap-4 inline-flex cursor-pointer">
            <div className="flex items-center me-4 gap-4">
              {/* <div className="w-6 h-6 rounded-sm border-2 border-slate-500" /> */}
              <div
                className={`flex items-center justify-center w-6 h-6 rounded-sm border-2 border-slate-500 ${
                  isEmailChecked ? 'bg-brand-primary' : ''
                } ${isEmailChecked ? 'border-none' : 'border-2'}`}
                onClick={handleEmailCheckboxChange}
              >
                {isEmailChecked && (
                  <img
                    src="assets/images/icon/check.svg"
                    className="w-4 h-4 text-white absolute"
                  />
                )}
              </div>
              <label
                htmlFor="email-checkbox"
                className="text-grayscale-300
                text-base
                font-normal
                font-['SUIT']
                leading-7
                tracking-tight
                "
              >
                E-Mail 수신
              </label>
            </div>
          </div>
          <div
            className={`self-stretch h-[52px] bg-slate-600 rounded-lg justify-start items-center inline-flex`}
          >
            <input
              type="email"
              placeholder="abcd@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                onEmailChange(e.target.value, e.target.checked);
              }}
              className={`grow self-stretch px-4 py-3 rounded-lg basis-0 text-slate-400 bg-slate-600 text-lg font-medium font-['SUIT'] leading-7 tracking-tight`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactToolArea;
