
import { Check } from "lucide-react"


interface ICopyTooltopProps {
    isOpen?: boolean
}

export const CopyTooltop = ({isOpen}: ICopyTooltopProps) => {
    return (
              <div className={`fixed bottom-6 right-6 transition-all duration-500 ease-in-out ${
        isOpen 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 translate-x-full pointer-events-none'
      }`}>
        <div className={`flex items-center px-4 py-3 rounded-lg shadow-lg dark:bg-blue-600 dark:text-white bg-purple-500 text-white`}>
          <Check className="w-5 h-5 mr-2" />
          <span className="font-medium">복사가 완료되었습니다!</span>
        </div>
      </div>
    
    )
}   