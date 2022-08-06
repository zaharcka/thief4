import React, { useEffect, useState } from "react";
import { SimpleMenu, MenuItem } from "@strapi/design-system/SimpleMenu";
import axios from "axios";
import { Textarea } from "@strapi/design-system/Textarea";

const PageSelector = ({ siteId, onSelectPage }) => {
  const [loadedPages, setLoadedPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);

  useEffect(async () => {
    const res = await axios.get(`http://localhost:1337/api/pages`, {
      params: {
        fields: ["URL", "title"],
        "filters[site][id][$eq]": siteId,
      },
    });
    const pages = res.data.data;
    setLoadedPages(pages.map((item) => ({ id: item.id, ...item.attributes })));
  }, [siteId]);

  const handleSelectPage = (page) => {
    setSelectedPage(page);
    onSelectPage(page);
  };

  return (
    <>
      <SimpleMenu
        id="label"
        label={selectedPage?.URL || "Выберите страницу для примера"}
      >
        {loadedPages.map((page) => (
          <MenuItem
            id="menuItem"
            onClick={() => handleSelectPage(page)}
            key={page.id}
          >
            {page.URL}
          </MenuItem>
        ))}
      </SimpleMenu>
    </>
  );
};

export default PageSelector;
