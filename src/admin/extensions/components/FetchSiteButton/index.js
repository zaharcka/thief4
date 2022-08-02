import React, { useState, useEffect } from "react";
import { Button } from "@strapi/design-system/Button";
import ManyWays from "@strapi/icons/ManyWays";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import axios from "axios";

const FetchSiteButton = () => {
  const { modifiedData: currentSite, layout } = useCMEditViewDataManager();
  if (layout.uid !== "api::site.site") {
    return null;
  }
  const [disabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Parse sitemap");

  let taskUpdater;

  const updateActivity = async () => {
    const res = await axios.get(
      `http://localhost:1337/thief-parser/getTaskStore`
    );
    const tasks = res.data;
    const isAffected = tasks.some(
      (task) =>
        task.affect.sites.some(
          (affectedSite) => currentSite.id === affectedSite
        ) && task.type === "fetchBySitemap"
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

  useEffect(async () => {
    await updateActivity();
  }, []);

  const handleStartScrapingPages = async () => {
    try {
      const { id } = currentSite;
      const res = await axios.post(
        `http://localhost:1337/thief-parser/parseSite/${id}`,
        currentSite
      );
      if (res.data === "ok") {
        setIsDisabled(true);
        setButtonText("Sitemap is being scanned");
      }
    } catch (e) {
      console.log("Error>>>", e);
    }
  };

  return (
    <Button
      size="S"
      startIcon={<ManyWays />}
      style={{ width: "100%" }}
      to={"/"}
      variant="secondary"
      onClick={handleStartScrapingPages}
      disabled={disabled}
    >
      {buttonText}
    </Button>
  );
};

export default FetchSiteButton;
