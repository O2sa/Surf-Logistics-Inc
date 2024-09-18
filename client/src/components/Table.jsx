import { useMemo, useEffect, useState, useRef } from 'react'
import {
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
  MantineReactTable,
  useMantineReactTable,
  MRT_EditActionButtons,
} from 'mantine-react-table'

// import cairo
import { MRT_Localization_AR } from 'mantine-react-table/locales/ar'
// import useTable
import {
  ActionIcon,
  Button,
  Flex,
  Text,
  Tooltip,
  Title,
  Box,
  Menu,
  Badge,
  MantineProvider,
  Anchor,
  Stack,
  TextInput,
  MultiSelect,
  Indicator,
  Group,
  Avatar,
  Checkbox,
  Modal,
  NumberInput,
  Radio,
  Select,
} from '@mantine/core'
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { IconDownload, IconEdit, IconTrash } from '@tabler/icons-react'
import { useCrudOperations, useGetElements } from '../../utils/crud'
import { modals } from '@mantine/modals'
import { default_permissions_admin, permissions_ar } from '../../utils/data'
import ChangeAdminSchool from '../../components/ChangeAdminSchool'
import { useDisclosure } from '@mantine/hooks'

import { ExportDataComponent, UserProfile } from '../../components'

export default function Admins({}) {
  const columns = useMemo(
    () => [
      {
        id: 'index',
        enableEditing: false,
        accessorFn: (row, rowIndex) => rowIndex + 1,
        header: '#',
      },
      {
        accessorKey: 'name',
        header: 'المدير',
        enableEditing: true,
        Cell: ({ cell, row }) => <UserProfile key={row?.original?._id} user={row?.original} />,
      },


      {
        accessorKey: 'school.office._id',
        Cell: ({ cell, row }) => {
          const school = row?.original?.school
          return (
            <Group noWrap spacing={'md'}>
              {!school ? (
                'لم تحدد'
              ) : (
                <Box ta={'center'}>
                  <Text fz="sm" fw={500}>
                    {`${school?.name} `}
                  </Text>
                  <Text fz="xs" c="dimmed">
                    {school?.office?.name}
                  </Text>
                </Box>
              )}
              <Tooltip label="تغيير المدرسة">
                <ActionIcon
                  onClick={() => {
                    setNewRowData(row?.original)
                    open()
                  }}
                  // variant="light"
                  // color="secondary"
                >
                  <IconEdit size={16} />
                </ActionIcon>
              </Tooltip>
            </Group>
          )
        },
        enableEditing: false,
        header: 'المدرسة',
      },

      // {
      //   accessorKey: 'permissions',
      //   enableEditing: true,

      //   Cell: ({ cell, row }) => {
      //     const perms = row?.original?.permissions
      //     if (!perms) return ''
      //     const elems = Object.keys(perms).filter((val) => !perms[val])
      //     return (
      //       <div>
      //         {elems.map((val, idx) => (
      //           <Checkbox
      //             mb={'md'}
      //             readOnly
      //             indeterminate={true}
      //             checked={true}
      //             color={'red'}
      //             key={idx}
      //             label={permissions_ar[val]}
      //           />
      //         ))}
      //       </div>
      //     )
      //   },

      //   header: 'الصلاحيات الموقفة',
      // },
    ],
    [],
  )

  const route = ['admins']
  //call CREATE hook
  const { mutateAsync: createAdmin, isLoading: isCreatingAdmin } = useCrudOperations(
    route,
    route,
    'create',
  )
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [globalFilter, setGlobalFilter] = useState('')

  const { data, isError, isFetching, isLoading } = useQuery(
    useGetElements(route, { ...pagination, search: globalFilter }),
  )
  const [newRowData, setNewRowData] = useState({})

  const { mutateAsync: updateAdmin, isLoading: isUpdatingAdmin } = useCrudOperations(
    route,
    route,
    'update',
  )
  const { mutateAsync: deleteAdmin, isLoading: isDeletingAdmin } = useCrudOperations(
    route,
    route,
    'delete',
  )

  const handleCreateAdmin = async ({ values, row, table, exitCreatingMode }) => {
    await createAdmin({ ...newRowData })
    // modals.closeAll()
    table.setCreatingRow(null)
  }
  //UPDATE action
  const handleSaveAdmin = async ({ values, row, table }) => {
    // console.log(values)

    await updateAdmin({ ...newRowData, _id: row.original?._id })
    table.setEditingRow(null) //exit editing mode
  }

  //DELETE action
  const openDeleteConfirmModal = (row) => deleteAdmin(row.original._id)
  const [opened, { close, open }] = useDisclosure(false)

  const { data: administrations = [], isLoading: isLoadingAdministrations } = useQuery(
    useGetElements(['administrations']),
  )

  const { data: offices, isLoading: isLoadingOffices } = useQuery({
    ...useGetElements(['offices', 'administration-offices', newRowData.administration]),
    enabled: !!newRowData.administration,
  })

  const { data: schools, isLoading: isLoadingSchools } = useQuery({
    ...useGetElements(['schools', 'office-schools', newRowData.office]),
    enabled: !!newRowData.office,
  })

  const table = useMantineReactTable({
    columns: columns,
    data: data?.data ?? [],
    // enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableFacetedValues: true,
    enableGrouping: true,
    enablePinning: true,
    enableEditing: true,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    localization: MRT_Localization_AR,
    enableRowActions: true,
    manualPagination: true,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    rowCount: data?.meta?.totalRowCount ?? 0,

    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    mantinePaginationProps: {
      radius: 'xl',
      size: 'lg',
    },
    mantineToolbarAlertBannerProps: isError
      ? {
          color: 'red',
          children: 'خطأ في تحميل البيانات',
        }
      : undefined,
    mantineTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowSave: handleCreateAdmin,
    onEditingRowSave: handleSaveAdmin,
    renderRowActions: ({ row, table }) => (
      <Flex gap="md">
        <Tooltip label="تعديل">
          <ActionIcon
            onClick={() => {
              if (row.getAllCells) {
                // console.log('row', row.getAllCells())
              } else {
                console.error('row does not have getAllCells method')
              }
              setNewRowData({
                permissions: row.original.permissions,
                name: row.original.name,
                email: row.original.email,
              })
              return table.setEditingRow(row)
            }}
          >
            <IconEdit />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="حذف">
          <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row)}>
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
    renderCreateRowModalContent: ({ internalEditComponents, row, table }) => (
      <Stack>
        <Title order={5}>إنشاء مدير مدرسة</Title>
        <TextInput
          withAsterisk
          label="الاسم "
          name="name"
          placeholder="الاسم "
          onChange={(e) => setNewRowData({ ...newRowData, name: e.target.value })}
        />
        <TextInput
          withAsterisk
          label="الايميل"
          name="email"
          id="email"
          placeholder=" الايميل"
          onChange={(e) => setNewRowData({ ...newRowData, email: e.target.value })}
        />{' '}
        <Select
          data={administrations?.map((val) => ({ value: val._id, label: val.name })) || []}
          label="إدارة التعليم"
          value={newRowData.administration}
          name="administration"
          onChange={(selectedValue) =>
            setNewRowData({
              ...newRowData,
              administration: selectedValue,
              office: null,
              school: null,
            })
          }
        />{' '}
        <Select
          data={offices?.map((val) => ({ value: val._id, label: val.name })) || []}
          label="مكتب التعليم"
          name="office"
          value={newRowData.office}
          disabled={!newRowData.administration}
          onChange={(selectedValue) =>
            setNewRowData({ ...newRowData, office: selectedValue, school: null })
          }
        />{' '}
        <Select
          data={schools?.map((val) => ({ value: val._id, label: val.name })) || []}
          label="المدرسة"
          value={newRowData.school}
          name="school"
          disabled={!newRowData.office}
          onChange={(selectedValue) => setNewRowData({ ...newRowData, school: selectedValue })}
        />
        <Stack my={'xs'}>
          <Text>الصلاحيات</Text>
          {Object.keys(default_permissions_admin).map((val, idx) => (
            <Radio.Group
              label={`${permissions_ar[val]}: `}
              defaultValue="true"
              key={idx}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
              onChange={(e) =>
                setNewRowData({
                  ...newRowData,
                  permissions: { ...newRowData.permissions, [val]: e },
                })
              }
            >
              <Group display={'inline-flex'} mx="xs">
                <Radio value="true" label="سماح" />
                <Radio color="red" value="false" label="منع" />
              </Group>
            </Radio.Group>
          ))}
        </Stack>
        <Flex justify="flex-end">
          <MRT_EditActionButtons row={row} table={table} variant="text" />{' '}
        </Flex>
      </Stack>
    ),
    renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
      <Stack>
        <Title order={5}>تعديل مدير المدرسة</Title>
        <TextInput
          withAsterisk
          label="الاسم "
          name="name"
          defaultValue={row?.original?.name}
          placeholder="الاسم "
          onChange={(e) => setNewRowData({ ...newRowData, name: e.target.value })}
        />
        <TextInput
          withAsterisk
          label="الايميل"
          name="email"
          id="email"
          defaultValue={row?.original?.email}
          placeholder=" الايميل"
          onChange={(e) => setNewRowData({ ...newRowData, email: e.target.value })}
        />{' '}
        <Stack my={'xs'}>
          <Text>الصلاحيات</Text>
          {Object.keys(row?.original?.permissions).map((val, idx) => (
            <Radio.Group
              label={`${permissions_ar[val]}: `}
              defaultValue={`${row?.original?.permissions[val]}`}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
              key={idx}
              onChange={(e) => {
                setNewRowData({
                  ...newRowData,
                  permissions: { ...newRowData.permissions, [val]: e },
                })
                // console.log('row in model', row.getAllCells())
              }}
            >
              <Group display={'inline-flex'} mx="xs">
                <Radio value="true" label="سماح" />
                <Radio color="red" value="false" label="منع" />
              </Group>
            </Radio.Group>
          ))}
        </Stack>
        <Flex justify="flex-end">
          <MRT_EditActionButtons row={row} table={table} variant="text" />{' '}
        </Flex>
      </Stack>
    ),

    mantineCreateRowModalProps: {
      centered: true,
      closeButtonProps: {},
      onClose: () => setNewRowData({}),
    },
    mantineEditRowModalProps: {
      centered: true,
      onClose: () => setNewRowData({}),
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Flex gap={'sm'} wrap={'wrap'}>
        <Button
          onClick={() => {
            table.setCreatingRow(true)
            setNewRowData({ permissions: default_permissions_admin })
          }}
        >
          إنشاء مستخدم جديد
        </Button>

        <ExportDataComponent
          disable={table.getPrePaginationRowModel().rows.length === 0}
          header={['#', 'الأسم', 'الإيميل', 'المدرسة', 'الصلاحيات الموقفة'].reverse()}
          body={table.getPrePaginationRowModel().rows.map((val, idx) => {
            const data = val?.original
            const permissions = Object.keys(data?.permissions || {})
              .filter((val) => !data?.permissions[val])
              .map((val) => permissions_ar[val])
              .join(' - ')

            return [
              `${idx + 1}`,
              data.name,
              data.email,
              data?.school?.name || 'غير محدد',
              permissions,
            ].reverse()
          })}
        />
      </Flex>
    ),

    state: {
      isLoading: isLoading,
      isSaving: isCreatingAdmin || isUpdatingAdmin || isDeletingAdmin,
      showAlertBanner: isError,
      showProgressBars: isFetching,
      pagination,
      globalFilter,
    },
  })

  return (
    <div>
      <MantineReactTable table={table} />
      {opened && (
        <ChangeAdminSchool
          close={() => {
            setNewRowData({})
            close()
          }}
          userData={newRowData}
          opened={opened}
          key={'edit-modal'}
        />
      )}
    </div>
  )
}
