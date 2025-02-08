import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

const ExTable = () => {
  const [vacas, setVacas] = useState([]); // Estado para almacenar los datos

  useEffect(() => {
    fetch("http://localhost:4000/api/vacas") // URL de la API
      .then((response) => response.json()) // Convertimos la respuesta en JSON
      .then((data) => setVacas(data.body)) // Guardamos los datos en el estado
      .catch((error) => console.error("Error al obtener datos:", error));
  }, []); // Se ejecuta una sola vez al montar el componente

  return (
    <Table
      aria-label="simple table"
      sx={{
        mt: 3,
        whiteSpace: "nowrap",
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              ID
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Nombre
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Color
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Estado Reproductivo
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Fecha Prevista de Parto
            </Typography>
          </TableCell>
          <TableCell align="center">
            <Typography color="textSecondary" variant="h6">
              Imagen
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {vacas.length > 0 ? (
          vacas.map((vaca) => (
            <TableRow key={vaca.id}>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                  {vaca.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: "600" }}>
                  {vaca.nombre}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>{vaca.color}</Typography>
              </TableCell>
              <TableCell>
                <Chip
                  sx={{
                    pl: "4px",
                    pr: "4px",
                    backgroundColor: vaca.estado_reproductivo === "Lactando" ? "green" : "gray",
                    color: "#fff",
                  }}
                  size="small"
                  label={vaca.estado_reproductivo}
                />
              </TableCell>
              <TableCell>
                <Typography>
                  {new Date(vaca.fecha_prevista_parto).toLocaleDateString()}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <img
                  src={vaca.url_imagen}
                  alt={vaca.nombre}
                  style={{ width: "50px", height: "50px", borderRadius: "5px" }}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} align="center">
              <Typography color="textSecondary">Cargando datos...</Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ExTable;
