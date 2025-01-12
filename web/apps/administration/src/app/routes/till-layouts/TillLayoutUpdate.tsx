import { useUpdateTillLayoutMutation, useGetTillLayoutByIdQuery, selectTillLayoutById } from "@api";
import * as React from "react";
import { TillLayoutSchema } from "@stustapay/models";
import { useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TillLayoutChange } from "./TillLayoutChange";
import { Loading } from "@stustapay/components";

export const TillLayoutUpdate: React.FC = () => {
  const { t } = useTranslation();
  const { layoutId } = useParams();
  const { layout, isLoading } = useGetTillLayoutByIdQuery(Number(layoutId), {
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      layout: data ? selectTillLayoutById(data, Number(layoutId)) : undefined,
    }),
  });
  const [updateLayout] = useUpdateTillLayoutMutation();

  if (isLoading) {
    return <Loading />;
  }

  if (!layout) {
    return <Navigate to="/till-layouts" />;
  }

  return (
    <TillLayoutChange
      headerTitle={t("layout.update")}
      submitLabel={t("update")}
      initialValues={layout}
      validationSchema={TillLayoutSchema}
      onSubmit={updateLayout}
    />
  );
};
