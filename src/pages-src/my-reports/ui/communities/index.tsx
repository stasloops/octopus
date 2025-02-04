import React from "react";
import { Button, TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Image from "next/image";

export const CommunitiesElement = () => {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead></TableHead>
          <TableBody>
            {[].map((community: any) => {
              return (
                <TableRow key={community.id}>
                  <TableCell>
                    <Image alt={community.title} src={community.photo_url} />
                  </TableCell>
                  <TableCell>{community.title}</TableCell>
                  <TableCell>{community.username}</TableCell>
                  <TableCell>{community.subscribers_count}</TableCell>
                  <TableCell>{community.country}</TableCell>
                  <TableCell>{community.country_percent}%</TableCell>
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
