import React from "react";
import {
  HeaderLayout,
  ActionLayout,
  Tag,
  Button,
  Box,
  ContentLayout,
} from "@strapi/design-system/Layout";
import { Divider } from "@strapi/design-system/Divider";
import { SimpleMenu, MenuItem } from "@strapi/design-system/SimpleMenu";
import Plus from "@strapi/icons/Plus";
import Pencil from "@strapi/icons/Pencil";
import ParserSettingModule from "../../components/ParserSettingBlock";

const ThiefConfigurationPage = () => {
  return (
    <>
      <HeaderLayout title="Thief Settings" subtitle="" as="h2" />
      <ContentLayout>
        <ParserSettingModule />
      </ContentLayout>
    </>
  );
};

export default ThiefConfigurationPage;
