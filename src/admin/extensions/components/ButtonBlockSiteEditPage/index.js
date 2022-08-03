import React from "react";
import FetchSiteButton from "../FetchSiteButton";
import LoadHTMLForEmptyPagesButton from "../LoadHTMLForEmptyPagesButton";

const ButtonBlockSiteEditPage = () => {
  return (
    <>
      <FetchSiteButton />
      <LoadHTMLForEmptyPagesButton />
    </>
  );
};

export default ButtonBlockSiteEditPage;
