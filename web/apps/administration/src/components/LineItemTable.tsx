import * as React from "react";
import { Tooltip } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { selectProductById, useGetProductsQuery, selectTaxRateById, useGetTaxRatesQuery } from "@api";
import { Loading } from "@components/Loading";
import { LineItem } from "@models";
import { useCurrencyFormatter } from "src/hooks";

export interface LineItemTableProps {
  lineItems: LineItem[];
}

export const LineItemTable: React.FC<LineItemTableProps> = ({ lineItems }) => {
  const { t } = useTranslation(["orders", "common"]);

  const formatCurrency = useCurrencyFormatter();

  const { data: products, isLoading: isProductsLoading } = useGetProductsQuery();
  const { data: taxRates, isLoading: isTaxRatesLoading } = useGetTaxRatesQuery();

  if (isProductsLoading || isTaxRatesLoading) {
    return <Loading />;
  }

  const renderProduct = (productId: number | null) => {
    if (productId == null || !products) {
      return "";
    }
    const product = selectProductById(products, productId);
    if (!product) {
      return "";
    }

    return <RouterLink to={`/products/${product.id}`}>{product.name}</RouterLink>;
  };

  const renderTaxRate = (name: string, rate: number) => {
    if (!taxRates) {
      return "";
    }

    const tax = selectTaxRateById(taxRates, name);
    if (!tax) {
      return "";
    }

    return (
      <Tooltip title={tax.description}>
        <span>{(rate * 100).toFixed(0)} %</span>
      </Tooltip>
    );
  };

  const itemColumns: GridColumns<LineItem> = [
    {
      field: "product_id",
      headerName: t("item.product") as string,
      type: "number",
      width: 100,
      renderCell: (params) => renderProduct(params.row.product_id),
    },
    {
      field: "quantity",
      headerName: t("item.quantity") as string,
      type: "number",
      width: 100,
    },
    {
      field: "price",
      headerName: t("item.price") as string,
      valueFormatter: ({ value }) => formatCurrency(value),
      width: 100,
    },
    {
      field: "total_price",
      headerName: t("item.totalPrice") as string,
      valueFormatter: ({ value }) => formatCurrency(value),
      width: 100,
    },
    {
      field: "tax_name",
      headerName: t("item.taxName") as string,
      width: 100,
    },
    {
      field: "tax_rate",
      headerName: t("item.taxRate") as string,
      renderCell: (params) => renderTaxRate(params.row.tax_name, params.row.tax_rate),
      align: "right",
      width: 100,
    },
    {
      field: "total_tax",
      headerName: t("item.totalTax") as string,
      valueFormatter: ({ value }) => formatCurrency(value),
      width: 100,
    },
  ];

  return (
    <DataGrid
      autoHeight
      rows={lineItems}
      columns={itemColumns}
      disableSelectionOnClick
      getRowId={(row) => row.item_id}
      sx={{ mt: 2, p: 1, boxShadow: (theme) => theme.shadows[1] }}
    />
  );
};
