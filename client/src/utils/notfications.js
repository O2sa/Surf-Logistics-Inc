
import { notifications } from '@mantine/notifications'
import { useTranslation } from 'react-i18next'

export const getNotfication = (sucess = true, message) => {
  // const {t}=useTranslation()
  if (sucess) {
    return notifications.show({
      id: 'sucess',
      title:'Suceess!',
      message: message || 'done !',
      variant: 'success',
      color: 'green',
      autoClose: 5000,
    })
  } else {
    return notifications.show({
      id: 'error-delete',
      title: 'Error!',
      message: message || 'Something went wrong!',
      variant: 'error',
      color: 'red',
      autoClose: 5000,
    })
  }
}
