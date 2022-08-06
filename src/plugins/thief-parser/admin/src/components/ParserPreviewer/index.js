import React, { useState, useEffect } from "react";
import { Box } from "@strapi/design-system/Box";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { Typography } from "@strapi/design-system/Typography";
import PageSelector from "./PageSelector";
import { Textarea } from "@strapi/design-system/Textarea";
import axios from "axios";
import styled from "styled-components";

const ParserPreviewer = ({ siteId }) => {
  const [selectedPage, setSelectedPage] = useState(null);

  const handleSelectPage = (page) => {
    setSelectedPage(page);
  };

  useEffect(async () => {
    if (selectedPage && !selectedPage.html) {
      const res = await axios.get(
        `http://localhost:1337/api/pages/${selectedPage?.id}`
      );
      console.log("res of Parse Previewer >>>>", res);
      const HTML = res.data.data.attributes.html;
      if (HTML) {
        setSelectedPage({ ...selectedPage, html: HTML });
      }
    }
  }, [selectedPage]);

  return (
    <Box marginTop={4}>
      <PageSelector siteId={siteId} onSelectPage={handleSelectPage} />
      <Grid gap={5}>
        <GridItem col={6}>
          {selectedPage?.html ? (
            <Textarea
              placeholder="This is a content placeholder"
              label="Content"
              name="content"
              hint="HTML of this page"
              onChange={() => {}}
              disabled={true}
              style={{
                height: 400,
              }}
            >
              {selectedPage?.html}
            </Textarea>
          ) : selectedPage ? (
            <>Loading</>
          ) : null}
        </GridItem>
        <GridItem col={6} background="primary100">
          <Typography>Second</Typography>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ParserPreviewer;
