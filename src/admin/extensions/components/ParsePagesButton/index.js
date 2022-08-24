import React, { useState, useEffect } from "react";
import ManyWays from "@strapi/icons/ManyWays";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import { Button } from "@strapi/design-system/Button";
import axios from "axios";

const ParsePagesButton = () => {
  const [disabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState(
    "Start parse empty pages by config"
  );
  const { modifiedData: currentSite, layout } = useCMEditViewDataManager();

  let taskUpdater;

  const handleStartParsingPages = async () => {
    try {
      const res = await axios.post(
        `http://localhost:1337/thief-parser/startParsing/${currentSite.id}`,
        { id: currentSite.id }
      );
    } catch (e) {
      console.log("Error while handle click >>>", e);
    }
  };

  const updateActivity = async () => {
    const res = await axios.get(
      `http://localhost:1337/thief-parser/startParsing/${currentSite}`
    );
    const tasks = res.data;
    if (!tasks) {
      return;
    }
    const isAffected = tasks.some(
      (task) =>
        task.affect.sites.some(
          (affectedSite) => currentSite.id === affectedSite
        ) && task.type === "parsingSiteByConfig"
    );
    if (isAffected) {
      setIsDisabled(true);
      setButtonText("Sitemap is being scanned");
    } else {
      if (taskUpdater) {
        clearInterval(taskUpdater);
      }
      setIsDisabled(false);
      setButtonText("Parse sitemap");
    }
  };

  useEffect(async () => {
    if (disabled) {
      taskUpdater = setInterval(async () => {
        await updateActivity();
      }, 1000);
    } else {
      if (taskUpdater) {
        clearInterval(taskUpdater);
      }
    }
    return () => {
      if (taskUpdater) {
        clearInterval(taskUpdater);
      }
    };
  }, [disabled]);

  return (
    <Button
      size="S"
      startIcon={<ManyWays />}
      style={{ width: "100%" }}
      to={"/"}
      variant="secondary"
      onClick={handleStartParsingPages}
      disabled={disabled}
    >
      {buttonText}
    </Button>
  );
};

export default ParsePagesButton;
