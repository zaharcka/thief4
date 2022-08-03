import React, { useState, useEffect } from "react";
import { Button } from "@strapi/design-system/Button";
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

  const handleClick = async () => {
    try {
      const res = await axios.post(
        `http://localhost:1337/thief-parser/startCrawler/${currentSite.id}`,
        { id: currentSite.id }
      );
      console.log("res>>>>", res);
    } catch (e) {
      console.log("Error while handle click >>>", e);
    }
  };

  return (
    <Button
      size="S"
      startIcon={<Download />}
      style={{ width: "100%" }}
      to={"/"}
      variant="secondary"
      onClick={handleClick}
      disabled={disabled}
    >
      {buttonText}
    </Button>
  );
};

export default LoadHTMLForEmptyPagesButton;
