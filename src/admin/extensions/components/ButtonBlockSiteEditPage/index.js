import React from "react";
import FetchSiteButton from "../FetchSiteButton";
import LoadHTMLForEmptyPagesButton from "../LoadHTMLForEmptyPagesButton";
import ParsePagesButton from "../ParsePagesButton";

const ButtonBlockSiteEditPage = () => {
  return (
    <>
      <FetchSiteButton />
      <LoadHTMLForEmptyPagesButton />
      <ParsePagesButton />
    </>
  );
};

export default ButtonBlockSiteEditPage;
