import { useMemo, useEffect, useState, useRef } from "react";
import {
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
  MantineReactTable,
  useMantineReactTable,
  MRT_EditActionButtons,
} from "mantine-react-table";

// import cairo
import { MRT_Localization_AR } from "mantine-react-table/locales/ar";
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
} from "@mantine/core";

import { IconDownload, IconEdit, IconTrash } from "@tabler/icons-react";

import { useTranslation } from "react-i18next";
import { useCrudOperations, useGetElements } from "../utils/crud";
import UserProfile from "../components/UserProfile";
import {
  convertUtcDateToLocal,
  formatCurrency,
  isUserAdmin,
} from "../utils/utils";

export default function Messages({}) {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      {
        id: "index",
        enableEditing: false,
        accessorFn: (row, rowIndex) => rowIndex + 1,
        header: "#",
      },

      {
        accessorKey: "name",
        header: t("Name"),
        enableEditing: false,
      },
      {
        accessorKey: "email",
        header: t("Email"),
        enableEditing: false,
        enableClickToCopy: true,
      },
      {
        accessorKey: "createdAt",
        header: t("Created at"),
        enableEditing: false,
        Cell: ({ cell, row }) => {
          const date = convertUtcDateToLocal(row?.original?.createdAt ?? "");

          return <Text color="dimmy">{date}</Text>;
        },
      },
      {
        accessorKey: "comments",
        header: t("Additional Information / Comments"),
        enableEditing: false,
      },
    ],
    []
  );

  const route = ["messages"];

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [globalFilter, setGlobalFilter] = useState("");

  const { data, isError, isFetching, isLoading } = useGetElements({
    query: route,
    params: {
      ...pagination,
      search: globalFilter,
    },
  });

  const [newRowData, setNewRowData] = useState({});

  const { mutateAsync: updateQuote, isLoading: isUpdating } = useCrudOperations(
    route,
    route,
    "update"
  );

  //UPDATE action
  const handleSaveQuote = async ({ values, row, table }) => {
    await updateQuote({ state: newRowData.price, _id: row.original?._id });
    table.setEditingRow(null); //exit editing mode
  };

  const { mutateAsync: deleteItem, isLoading: isDeleting } = useCrudOperations(
    route,
    route,
    "delete"
  );
  const handleDelete = (row) => deleteItem(row.original._id);
  const table = useMantineReactTable({
    columns: columns,
    data: data?.data ?? [],
    // enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableFacetedValues: true,
    enableGrouping: true,
    enableRowActions: true,
    enablePinning: true,
    enableEditing: false,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    manualPagination: true,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    rowCount: data?.meta?.totalRowCount ?? 0,
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    mantinePaginationProps: {
      radius: "xl",
      size: "lg",
    },
    mantineToolbarAlertBannerProps: isError
      ? {
          color: "red",
          children: "",
        }
      : undefined,
    mantineTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onEditingRowSave: handleSaveQuote,
    renderRowActions: ({ row, table }) => (
      <Flex gap="md">
        <Tooltip label="delete">
          <ActionIcon color="red" onClick={() => handleDelete(row)}>
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
    // renderTopToolbarCustomActions: ({ table }) => (
    //   <Flex gap={"sm"} wrap={"wrap"}>
    //     <ExportDataComponent
    //       disable={table.getPrePaginationRowModel().rows.length === 0}
    //       header={columns}
    //       body={table.getPrePaginationRowModel().rows.map((val, idx) => {
    //         const data = val?.original;
    //         const permissions = Object.keys(data?.permissions || {})
    //           .filter((val) => !data?.permissions[val])
    //           .map((val) => permissions_ar[val])
    //           .join(" - ");

    //         return [
    //           `${idx + 1}`,
    //           data.name,
    //           data.email,
    //           data?.school?.name || "غير محدد",
    //           permissions,
    //         ].reverse();
    //       })}
    //     />
    //   </Flex>
    // ),

    state: {
      isLoading: isLoading,
      isSaving: isUpdating,
      showAlertBanner: isError,
      showProgressBars: isFetching || isDeleting,
      pagination,
      globalFilter,
    },
  });

  return <MantineReactTable table={table} />;
}
