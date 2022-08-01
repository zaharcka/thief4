import React from 'react';
import { Button } from '@strapi/design-system/Button';
import ManyWays from '@strapi/icons/ManyWays';
import { useCMEditViewDataManager } from "@strapi/helper-plugin";

const FetchSiteButton = () => {
  const { modifiedData: currentSite, layout } = useCMEditViewDataManager();
  console.log('modifiedData>>>>', currentSite)
  console.log('layout>>>>', layout)
  const handleClick = () => {
    console.log('CLICK!!!');
  }

  if (layout.uid !== 'api::site.site') {
    return null;
  }

  return (
    <Button
      size="S"
      startIcon={<ManyWays />}
      style={{ width: '100%' }}
      to={'/'}
      variant="secondary"
      onClick={handleClick}
    >
      Get Pages of this site
    </Button>
  );
};

export default FetchSiteButton;
