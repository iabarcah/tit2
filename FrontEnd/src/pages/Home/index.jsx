import { useQuery } from "@tanstack/react-query";
import React from "react";
import Card from "../../components/Card";
import Carousel from "../../components/Carousel";
import HeaderLayout from "../../layouts/HeaderLayout";
import styles from "./styles.module.scss";
import { getEventos } from "../../app/api/eventos";

const img = [
  "https://www.shutterstock.com/image-vector/modern-sport-game-tournament-championship-260nw-1877457184.jpg",
  "https://cdnuploads.aa.com.tr/uploads/Contents/2020/03/13/thumbs_b_c_8113c4a7ee59f7c57205c38f9fa15ff2.jpg?v=161811",
  "https://www.fiba.basketball/api/img/graphic/c5132053-5932-4af1-9e9b-8597ed500e94/940/529",
];

const Home = () => {
  const { data, isLoading } = useQuery(["eventos"], getEventos);

  if (isLoading) return <p>Loading...</p>;

  console.log(data);

  return (
    <HeaderLayout>
      <div className={styles.home}>
        <div className={styles.carrousel_wrapper}>
          <Carousel>
            {img.map((url, index) => (
              <img key={index} src={url} />
            ))}
          </Carousel>
        </div>
        <div className={styles.card_container}>
          {data?.map((evento) => {
            return (
              <Card
                key={evento.id_evento}
                id={evento.id_evento}
                title={evento.nombre_evento}
                description={evento.descripcion_evento}
                src={img[0]}
              />
            );
          })}
        </div>
      </div>
    </HeaderLayout>
  );
};

export default Home;
