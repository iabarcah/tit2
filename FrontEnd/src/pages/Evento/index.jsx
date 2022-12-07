import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import React from "react";
import { useParams } from "react-router-dom";
import { getEvento } from "../../app/api/eventos";
import HeaderLayout from "../../layouts/HeaderLayout";
import styles from "./styles.module.scss";

const Evento = () => {
  const params = useParams();

  const { data = {}, isLoading } = useQuery(["eventos", params.id], () =>
    getEvento({ id: params.id })
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <HeaderLayout>
      <div className={styles.evento_container}>
        <h1>Evento: {data.nombre_evento}</h1>
        <h3>Tipo evento: {data.tipo_evento}</h3>
        <h3>Cupos: {data.cupo_evento}</h3>
        <h3>
          Del{" "}
          {DateTime.fromISO(data.hora_inicio_evento).toFormat(
            "dd 'de' LLL 'del' yyyy 'a las' HH:mm",
            { locale: "es" }
          )}{" "}
          hasta el{" "}
          {DateTime.fromISO(data.fecha_fin_evento).toFormat(
            "dd 'de' LLL 'del' yyyy 'a las' HH:mm",
            { locale: "es" }
          )}
        </h3>
        <h3>Requisitos: {data.requisitos_evento}</h3>
        <h3>Requisitos: {data.estado_evento}</h3>
        <h3>Direccion: {data.direccion_evento}</h3>
        <p>Descripción: {data.descripcion_evento}</p>
        {JSON.stringify(data)}
      </div>
    </HeaderLayout>
  );
};

export default Evento;
