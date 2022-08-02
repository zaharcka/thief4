import React, {useState} from 'react';
import { Button } from '@strapi/design-system/Button';
import ManyWays from '@strapi/icons/ManyWays';
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import axios from "axios";

const FetchSiteButton = () => {
  const { modifiedData: currentSite, layout } = useCMEditViewDataManager();
  console.log('modifiedData>>>>', currentSite)
  console.log('layout>>>>', layout)
  const [disabled, isDisabled] = useState(false);


  if (layout.uid !== 'api::site.site') {
    return null;
  }

  const handleStartScrapingPages = async () => {
    try {
      const { id } = currentSite;
      const res = await axios.post(`http://localhost:1337/thief-parser/parseSite/${id}`, currentSite);
      if (res.data === 'ok') {
        isDisabled(true)
      }
    } catch (e) {
      console.log('Error>>>', e)
    }


  }

  return (
    <Button
      size="S"
      startIcon={<ManyWays />}
      style={{ width: '100%' }}
      to={'/'}
      variant="secondary"
      onClick={handleStartScrapingPages}
      disabled={disabled}
    >
      Get Pages of this site by Sitemap
    </Button>
  );
};

export default FetchSiteButton;
