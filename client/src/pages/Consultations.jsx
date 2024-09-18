import { useMemo, useEffect, useState, useRef } from "react";
import {
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
  MantineReactTable,
  useMantineReactTable,
  MRT_EditActionButtons,
} from "mantine-react-table";

// import cairo

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
  tableLocale,
} from "../utils/utils";
import { exportPdf } from "../utils/dataExport";

const statesColors = {
  approved: "green",
  pending: "yellow",
  canceled: "red",
};

export default function Consultations({}) {
  const { t, i18n } = useTranslation();
  const isAdmin = isUserAdmin();
  const customerCol = isAdmin
    ? [
        {
          accessorKey: "customer",
          enableEditing: false,
          header: t("User"),
          Cell: ({ cell, row }) => (
            <UserProfile key={row?.original?._id} user={row?.original?.user} />
          ),
        },
      ]
    : [];

  const columns = useMemo(
    () => [
      {
        id: "index",
        enableEditing: false,
        accessorFn: (row, rowIndex) => rowIndex + 1,
        header: "#",
      },

      ...customerCol,
      {
        accessorKey: "createdAt",
        header: t("Created at"),
        enableEditing: false,
        enableClickToCopy: true,
        Cell: ({ cell, row }) => {
          const date = convertUtcDateToLocal(row?.original?.createdAt ?? "");

          return <Text color="dimmy">{date}</Text>;
        },
      },
      {
        accessorKey: "state",
        header: t("State"),
        enableEditing: false,
        Cell: ({ cell, row }) => (
          <Badge color={statesColors[row?.original?.state]}>
            {t(row?.original?.state)}
          </Badge>
        ),
      },
      {
        accessorKey: "consultationInterest",
        header: t("Consultation Interest"),
        enableEditing: false,
      },

      {
        accessorKey: "date",

        Cell: ({ cell, row }) => {
          const date = convertUtcDateToLocal(row?.original?.date ?? "");
          return (
            <Text fz="xs" c="dimmed">
              {date}
            </Text>
          );
        },
        enableEditing: false,
        header: t("Appointment Date"),
        enableClickToCopy: true,
      },
      {
        accessorKey: "comments",
        header: t("Additional Information / Comments"),
        enableEditing: false,
      },
    ],
    []
  );

  const route = isAdmin
    ? ["consultations"]
    : ["current-user/get-consultations"];

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
    await updateQuote({ state: newRowData.state, _id: row.original?._id });
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
    enablePinning: true,
    enableEditing: isAdmin ? true : false,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableRowActions: true,
    manualPagination: true,
    localization: tableLocale(),
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
    renderRowActions: ({ row, table }) =>
      isAdmin && (
        <Flex gap="md">
          <Tooltip label="edit">
            <ActionIcon
              onClick={() => {
                if (row.getAllCells) {
                  // console.log('row', row.getAllCells())
                } else {
                  console.error("row does not have getAllCells method");
                }
                setNewRowData({
                  state: row.original.state,
                });
                return table.setEditingRow(row);
              }}
            >
              <IconEdit />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="delete">
            <ActionIcon color="red" onClick={() => handleDelete(row)}>
              <IconTrash />
            </ActionIcon>
          </Tooltip>
        </Flex>
      ),

    renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
      <Stack>
        <Title order={5}>{t("edit consultation state")}</Title>
        <Select
          withAsterisk
          label={t("State")}
          data={["approved", "pending", "cancel"]}
          value={newRowData?.state}
          placeholder={t("price")}
          onChange={(e) => setNewRowData({ ...newRowData, state: e })}
          dropdownPosition="bottom"
          // hideControls
          mb={"lg"}
          dropdownComponent={"div"}
        />

        <Flex justify="flex-end">
          <MRT_EditActionButtons row={row} table={table} variant="text" />{" "}
        </Flex>
      </Stack>
    ),

    mantineEditRowModalProps: {
      centered: true,
      onClose: () => setNewRowData({}),
    },

    renderTopToolbarCustomActions: ({ table }) => (
      <Flex gap={"sm"} wrap={"wrap"}>
        <Button
          style={{ display: isAdmin ? "block" : "none" }}
          disable={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() =>
            exportPdf(
              [t("#"), t("User"), t("Info"), t("Comments")],
              table.getPrePaginationRowModel().rows.map((row, idx) => {
                const data = row?.original;
                const user = `${data?.user["firstName"]} ${data?.user["lastName"]} \n${data?.user["email"]}`;

                const info = `${t("Created at:")} ${data["createdAt"]} \n${t(
                  "State:"
                )} ${t(data["state"])}\n${t("Consultation Interest:")} ${t(
                  data["consultationInterest"]
                )}\n${t("Appointment Date:")} ${t(data["date"])}`;
                const comments = data?.comments;

                return [`${idx + 1}`, user, info, comments];
              })
            )
          }
        >
          {t("Export as PDF")}
        </Button>
      </Flex>
    ),

    state: {
      isLoading: isLoading,
      isSaving: isUpdating || isDeleting,
      showAlertBanner: isError,
      showProgressBars: isFetching,
      pagination,
      globalFilter,
    },
  });

  return <MantineReactTable table={table} />;
}
