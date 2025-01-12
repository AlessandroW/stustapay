import * as React from "react";
import { Paper, ListItem, ListItemText, Stack } from "@mui/material";
import { selectOrderAll, useGetOrdersQuery } from "@api";
import { useTranslation } from "react-i18next";
import { Loading } from "@stustapay/components";
import { OrderTable } from "@components";

export const OrderList: React.FC = () => {
  const { t } = useTranslation();

  const { products: orders, isLoading: isOrdersLoading } = useGetOrdersQuery(undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      products: data ? selectOrderAll(data) : undefined,
    }),
  });

  if (isOrdersLoading) {
    return <Loading />;
  }

  return (
    <Stack spacing={2}>
      <Paper>
        <ListItem>
          <ListItemText primary={t("orders")} />
        </ListItem>
      </Paper>
      <OrderTable orders={orders ?? []} />
    </Stack>
  );
};
