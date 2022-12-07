import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

const Card = ({ id, src, title, description }) => {
  const navigate = useNavigate();

  const onClickNavigate = () => {
    navigate(`/evento/${id}`);
  };

  return (
    <div className={styles.card} onClick={onClickNavigate}>
      <img src={src} className={styles.img} />
      <div className={styles.card_body}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default Card;
