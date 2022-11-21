import { toast as hotToast } from 'react-hot-toast'
import {
  MdInfoOutline,
  MdCheckCircleOutline,
  MdOutlineWarningAmber,
  MdErrorOutline
} from 'react-icons/md'

const ToastTypeMap = {
  info: { icon: MdInfoOutline, className: 'alert-info' },
  success: { icon: MdCheckCircleOutline, className: 'alert-success' },
  warning: { icon: MdOutlineWarningAmber, className: 'alert-warning' },
  error: { icon: MdErrorOutline, className: 'alert-error' }
}

const _helper = (type: keyof typeof ToastTypeMap) => {
  const { icon: Icon, className } = ToastTypeMap[type]

  return (message: string) =>
    hotToast.custom((t) => {
      return (
        <div className={`alert ${className} w-fit shadow-lg`}>
          <div>
            <Icon className="w-6 h-6" /> {message}
          </div>
        </div>
      )
    })
}

const toast = {
  info: _helper('info'),
  success: _helper('success'),
  warning: _helper('warning'),
  error: _helper('error')
}

export default toast
