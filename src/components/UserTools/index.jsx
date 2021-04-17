// External import
import React from "react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

// Internal import
import NftCard from "./../NftCard";
import styles from "./styles.module.css";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const UserTools = ({ nfts, onCardClick }) => {
  return (
    <Swiper
      style={{ marginTop: "1rem", paddingLeft: "20%", paddingRight: "20%" }}
      spaceBetween={1}
      centeredSlides
      slidesPerView={5}
      navigation
      onSlideChange={() => console.log("slide change")}
      onSwiper={swiper => console.log(swiper)}
    >
      {nfts
        .filter(({ schema }) => schema === "tool.worlds")
        .map(props => (
          <SwiperSlide>
            <div className={styles.swapContainer}>
              <NftCard {...props} key={props.id} onCardClick={onCardClick} />
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default UserTools;
