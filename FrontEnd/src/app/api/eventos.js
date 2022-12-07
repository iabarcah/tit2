import axiosPublic from "../../services/index";

export const getEventos = async () => {
  const { data } = await axiosPublic.get("api/evento/?format=json");

  return data;
};

export const getEvento = async ({ id }) => {
  const { data } = await axiosPublic.get(`api/evento/${id}/?format=json`);

  return data;
};
