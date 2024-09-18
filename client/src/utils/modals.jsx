import { Alert, Box, Group, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconAlertCircle } from '@tabler/icons-react'

export const confirmModal = (confirmFun, message) => {
  const msg = 'هل أنت متأكد من رغبتك بإتمام العملية؟'
  return modals.openConfirmModal({
    centered: true,
    title: 'تأكيد العملية!',
    size: 'auto',
    children: <Box>{message ? message : msg}</Box>,

    labels: { confirm: 'تأكيد', cancel: 'إلغاء' },
    confirmProps: { color: 'brand' },
    onConfirm: confirmFun,
  })
}

export const confirmDeleteModal = (confirmFun, itemName = '') => {
  const msg = 'هل أنت متأكد من رغبتك بإتمام العملية؟'
  return modals.openConfirmModal({
    centered: true,
    title: 'تأكيد عملية الحذف!',
    size: 'auto',
    children: (
      <Box>
        <Group>
          {' '}
          هل أنت متأكد من رغبتك بحذف:
          <Text fw={'bold'}>{itemName}</Text>{' '}
        </Group>
        <Alert
          my={'md'}
          mb={'lg'}
          icon={<IconAlertCircle size="1rem" />}
          title="تنبيه!"
          color="red"
        >
          <Text c={'red'}>ستم حذف جيمع العناصر المرتبطة به ولا يمكن استرجاعها مرة أخرى.</Text>
        </Alert>
      </Box>
    ),

    labels: { confirm: 'تأكيد', cancel: 'إلغاء' },
    confirmProps: { color: 'red' },
    onConfirm: confirmFun,
  })
}
