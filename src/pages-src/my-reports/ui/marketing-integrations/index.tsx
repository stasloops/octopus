import React from "react";
import { Button, TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export const MarketingIntegrationsElement = () => {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Рекламодатели</TableCell>
              <TableCell>Хэштеги</TableCell>
              <TableCell>Кол-во постов</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[].map((integration: any) => {
              return (
                <TableRow key={integration.id}>
                  <TableCell>{integration.advertisers.join(", ")}</TableCell>
                  <TableCell>{integration.hashtags.join(", ")}</TableCell>
                  <TableCell>{integration.posts_count}</TableCell>
                  <TableCell>
                    <Button variant="contained">Отчёт</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
