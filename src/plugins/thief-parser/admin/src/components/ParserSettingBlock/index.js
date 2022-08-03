import React, { useEffect, useState } from "react";
import { SimpleMenu, MenuItem } from "@strapi/design-system/SimpleMenu";
import { Box } from "@strapi/design-system/Box";
import { Divider } from "@strapi/design-system/Divider";
import axios from "axios";
import InputJSON from "../InputJSON";

const ParserSettingModule = () => {
  const [allSites, setAllSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState(null);

  useEffect(async () => {
    const res = await axios.get(`http://localhost:1337/api/sites/`);
    const sites = res.data.data;
    setAllSites(sites.map((item) => ({ ...item.attributes, id: item.id })));
  }, []);

  const handleSelectSite = (site) => {
    setSelectedSite(site);
  };

  const JSONLine = selectedSite?.articles_parser_config
    ? JSON.stringify(selectedSite?.articles_parser_config, null, 4)
    : "";

  return (
    <Box padding={4}>
      <h4>Настройка парсер-модулей</h4>
      <Divider />
      <SimpleMenu
        id="label"
        label={
          selectedSite?.domain ||
          "Выберите сайт, модуль которого будем настраивать"
        }
      >
        {allSites.map((site) => (
          <MenuItem
            id="menuItem-January"
            onClick={() => handleSelectSite(site)}
            key={site.id}
          >
            {site.domain}
          </MenuItem>
        ))}
      </SimpleMenu>

      {JSONLine && <InputJSON name={"Parse config"} value={JSONLine} />}
    </Box>
  );
};

export default ParserSettingModule;
