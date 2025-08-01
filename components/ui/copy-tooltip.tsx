import { Check } from 'lucide-react';

interface ICopyTooltopProps {
  isOpen?: boolean;
}

export const CopyTooltop = ({ isOpen }: ICopyTooltopProps) => {
  return (
    <div
      className={`fixed bottom-6 right-6 transition-all duration-500 ease-in-out ${
        isOpen
          ? 'translate-x-0 opacity-100'
          : 'pointer-events-none translate-x-full opacity-0'
      }`}
    >
      <div
        className={`flex items-center rounded-lg bg-purple-500 px-4 py-3 text-white shadow-lg dark:bg-blue-600 dark:text-white`}
      >
        <Check className="mr-2 h-5 w-5" />
        <span className="font-medium">복사가 완료되었습니다!</span>
      </div>
    </div>
  );
};
