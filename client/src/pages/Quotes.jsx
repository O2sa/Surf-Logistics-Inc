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
import { exportPdf } from "../utils/dataExport";

const items = ["type", "quantity", "lenght", "width", "height", "weight"];
export default function Quote({}) {
  const { t } = useTranslation();
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
        accessorKey: "price",
        header: t("Price"),
        enableEditing: false,
        Cell: ({ cell, row }) => (
          <Text>{formatCurrency(row?.original?.price || 0)}</Text>
        ),
      },
      {
        accessorKey: "createdAt",
        header: t("Created at"),
        enableClickToCopy: true,
        enableEditing: false,
        Cell: ({ cell, row }) => {
          const date = convertUtcDateToLocal(row?.original?.createdAt ?? "");

          return <Text color="dimmy">{date}</Text>;
        },
      },
      {
        accessorKey: "shippingOption",
        header: t("Shipping Option"),
        enableEditing: false,
      },
      {
        accessorKey: "Services",
        header: t("Services"),
        enableEditing: false,
        Cell: ({ cell, row }) => {
          const pickupServices = row?.original?.pickupServices || "";
          const deliveryServices = row?.original?.deliveryServices || "";

          return (
            <Box>
              <Box mb={"sm"}>
                <Title order={5}>{t("Pickup Services")}</Title>
                <Text color="dimmy">{t(pickupServices)}</Text>
              </Box>{" "}
              <Box>
                <Title order={5}>{t("Delivery Services")}</Title>
                <Text color="dimmy">{t(deliveryServices)}</Text>
              </Box>
            </Box>
          );
        },
      },

      {
        accessorKey: "Itemdescription",
        Cell: ({ cell, row }) => {
          const item = row?.original;

          return (
            <Group>
              {items.map((val) => (
                <Box noWrap key={val} ta={"center"}>
                  <Text fz="sm" fw={500}>
                    {`${t(val)}: `}
                  </Text>
                  <Text fz="xs" c="dimmed">
                    {item[val] ?? ""}
                  </Text>
                </Box>
              ))}
            </Group>
          );
        },
        enableEditing: false,
        header: t("Item Description"),
      },
      {
        accessorKey: "delivery",
        Cell: ({ cell, row }) => {
          const code = row?.original?.deliveryPostalCode;
          const date = convertUtcDateToLocal(row?.original?.deliveryDate ?? "");
          return (
            <Stack spacing={"md"}>
              <Box ta={"center"}>
                <Text fz="sm" fw={500}>
                  {`${t("postal code")}: `}
                </Text>
                <Text fz="xs" c="dimmed">
                  {code}
                </Text>
              </Box>{" "}
              <Box ta={"center"}>
                <Text fz="sm" fw={500}>
                  {`${t("date")}: `}
                </Text>
                <Text fz="xs" c="dimmed">
                  {date}
                </Text>
              </Box>
            </Stack>
          );
        },
        enableEditing: false,
        header: t("Delivery Location"),
      },
      {
        accessorKey: "pickup",
        Cell: ({ cell, row }) => {
          const code = row?.original?.pickupPostalCode;
          const date = convertUtcDateToLocal(row?.original?.pickupDate ?? "");
          return (
            <Box noWrap spacing={"md"}>
              <Box ta={"center"} mb={"sm"}>
                <Text fz="sm" fw={500}>
                  {`${t("postal code")}: `}
                </Text>
                <Text fz="xs" c="dimmed">
                  {code}
                </Text>
              </Box>{" "}
              <Box ta={"center"}>
                <Text fz="sm" fw={500}>
                  {`${t("date")}: `}
                </Text>
                <Text fz="xs" c="dimmed">
                  {date}
                </Text>
              </Box>
            </Box>
          );
        },
        enableEditing: false,
        header: t("Pickup Location"),
      },
    ],
    []
  );

  const route = isAdmin ? ["quotes"] : ["current-user/get-quotes"];

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
    await updateQuote({ price: newRowData.price, _id: row.original?._id });
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
                  permissions: row.original.permissions,
                  name: row.original.name,
                  email: row.original.email,
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
        <Title order={5}>{t("edit quote price")}</Title>
        <NumberInput
          withAsterisk
          label={t("price")}
          name="name"
          value={row?.original?.price || 0}
          placeholder={t("price")}
          onChange={(e) => setNewRowData({ ...newRowData, price: e })}

          // hideControls
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
              [
                t("#"),
                t("User"),
                t("Info"),
                t("Pickup and Delivery"),
                t("Price"),
              ],
              table.getPrePaginationRowModel().rows.map((row, idx) => {
                const data = row?.original;
                const divider = "\n --------------\n";

                const user = `${data?.user["firstName"]} ${data?.user["lastName"]} \n${data?.user["email"]}`;
                const pickup = `${t(
                  "Pickup Location:"
                )}\n${convertUtcDateToLocal(data["pickupDate"])}\n${
                  data["pickupPostalCode"]
                }\n`;
                const delivery = `${t(
                  "Delivery Location:"
                )}\n${convertUtcDateToLocal(data["deliveryDate"])}\n${
                  data["deliveryPostalCode"]
                }\n`;
                const itemDes = items
                  .map((val) => `${t(val)}: ${data[val]}\n`)
                  .join("");
                const pickupServs = `${t("Pickup Services:")}\n${t(
                  data["pickupServices"]
                )}\n`;
                const deliveryServs = `${t("Delivery Services:")}\n${t(
                  data["deliveryServices"]
                )}\n`;

                const info = `${itemDes}${divider}${t("Shipping Option:")} ${t(
                  data["shippingOption"]
                )}`;
                const pickupANdDelivery = `Pickup\n\n${pickupServs}\n${pickup}${divider}Delivery\n\n${deliveryServs}\n${delivery}`;

                return [
                  `${idx + 1}`,
                  user,
                  info,
                  pickupANdDelivery,
                  formatCurrency(data?.price || 0),

                  // itemDes,
                  // delivery,
                  // pickup,
                ];
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
      isSaving: isUpdating,
      showAlertBanner: isError,
      showProgressBars: isFetching || isDeleting,
      pagination,
      globalFilter,
    },
  });

  return <MantineReactTable table={table} />;
}
