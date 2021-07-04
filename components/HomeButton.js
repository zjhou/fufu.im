import React from "react";
import { HomeSquare } from "../icons";
import style from "./HomeButton.module.scss";

export const HomeButton = (props) => {
  return (
    <div className={style.homeButton} onClick={props.onClick}>
      <HomeSquare />
    </div>
  );
};
