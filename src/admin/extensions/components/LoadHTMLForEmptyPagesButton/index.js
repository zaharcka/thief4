import React, { useState, useEffect } from "react";
import { Button } from "@strapi/design-system/Button";
import ManyWays from "@strapi/icons/ManyWays";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import axios from "axios";
import Download from "@strapi/icons/Download";

const LoadHTMLForEmptyPagesButton = () => {
  const { modifiedData: currentSite, layout } = useCMEditViewDataManager();
  if (layout.uid !== "api::site.site") {
    return null;
  }
  const [disabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Load HTML for empty pages");

  return (
    <Button
      size="S"
      startIcon={<Download />}
      style={{ width: "100%" }}
      to={"/"}
      variant="secondary"
      onClick={() => {}}
      disabled={disabled}
    >
      {buttonText}
    </Button>
  );
};

export default LoadHTMLForEmptyPagesButton;
