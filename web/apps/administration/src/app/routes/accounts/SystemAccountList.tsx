import * as React from "react";
import { Paper, ListItem, ListItemText, Stack } from "@mui/material";
import { selectAccountAll, useGetSystemAccountsQuery } from "@api";
import { useTranslation } from "react-i18next";
import { Loading } from "@stustapay/components";
import { AccountTable } from "./components/AccountTable";

export const SystemAccountList: React.FC = () => {
  const { t } = useTranslation();

  const { products: accounts, isLoading: isAccountsLoading } = useGetSystemAccountsQuery(undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      products: data ? selectAccountAll(data) : undefined,
    }),
  });

  if (isAccountsLoading) {
    return <Loading />;
  }

  return (
    <Stack spacing={2}>
      <Paper>
        <ListItem>
          <ListItemText primary={t("systemAccounts")} />
        </ListItem>
      </Paper>
      <AccountTable accounts={accounts ?? []} />
    </Stack>
  );
};
