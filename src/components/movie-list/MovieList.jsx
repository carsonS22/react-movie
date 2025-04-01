import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

import "./movie-list.scss";

import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper";

import MovieCard from "../movie-card/MovieCard";

import tmdbApi, { category } from "./../../api/tmdbApi";

const MovieList = (props) => {
  const [items, setItems] = useState([]);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};

      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(props.type, { params });
            break;
          default:
            response = await tmdbApi.getTvList(props.type, { params });
        }
      } else {
        response = await tmdbApi.similar(props.category, props.id);
      }
      setItems(response.results);
    };
    getList();
  }, [props.category, props.id, props.type]);

  return (
    <div className="movie-list">
      <div className="movie-list__navigation">
        <div ref={navigationPrevRef} className="movie-list__navigation__prev">
          <i className="bx bx-chevron-left"></i>
        </div>
        <div ref={navigationNextRef} className="movie-list__navigation__next">
          <i className="bx bx-chevron-right"></i>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        grabCursor={false}
        spaceBetween={10}
        slidesPerView={"auto"}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <MovieCard item={item} category={props.category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;