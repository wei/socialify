import clsx from 'clsx'
import { toast as hotToast } from 'react-hot-toast'
import {
  MdCheckCircleOutline,
  MdErrorOutline,
  MdInfoOutline,
  MdOutlineWarningAmber,
} from 'react-icons/md'

const ToastTypeMap = {
  info: { icon: MdInfoOutline, className: 'alert-info', label: 'Info' },
  success: {
    icon: MdCheckCircleOutline,
    className: 'alert-success',
    label: 'Success',
  },
  warning: {
    icon: MdOutlineWarningAmber,
    className: 'alert-warning',
    label: 'Warning',
  },
  error: { icon: MdErrorOutline, className: 'alert-error', label: 'Error' },
}

const _helper = (type: keyof typeof ToastTypeMap) => {
  const { icon: Icon, className, label } = ToastTypeMap[type]

  return (message: string) => {
    hotToast.custom(
      <div
        aria-live="assertive"
        className={clsx('alert w-fit shadow-lg', className)}
        data-testid={`toast-${type}`}
        role="alert"
      >
        <div className="flex items-center">
          <Icon aria-hidden="true" className="w-6 h-6" />
          <span aria-label={label} className="ps-2">
            {message}
          </span>
        </div>
      </div>
    )
  }
}

const toast = {
  info: _helper('info'),
  success: _helper('success'),
  warning: _helper('warning'),
  error: _helper('error'),
}

export default toast
