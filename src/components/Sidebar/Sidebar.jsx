import React, { useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/styles";
import useStyles from "./styles.js";
import { useGetGenresQuery } from "../../services/TMDB.js";
import Logo from "../../assets/genres/adventure.png";
import genreIcons from "../../assets/genres";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
const categories = [
  {
    label: "Popular",
    value: "popular",
  },
  {
    label: "Top Rated",
    value: "top_rated",
  },
  {
    label: "Upcoming",
    value: "upcoming",
  },
];

// const demoCategories = ["Comedy", "Action", "Horror", "Animation"];

const redLogo =
  "https://fontmeme.com/permalink/230419/eba90730a0720a86c555b6f3e8a0c2d1.png";
const blueLogo =
  "https://fontmeme.com/permalink/230419/73edaa5a5ddf693cbed020f15076616f.png";

const Sidebar = ({ setMobileOpen }) => {
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const classes = useStyles();
  const theme = useTheme();
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);

  // console.log(data);
  return (
    <>
      {/* moviemaze logo */}
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === "light" ? blueLogo : redLogo}
          alt="tibet film logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader> Categories</ListSubheader>

        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem
              onClick={() => dispatch(selectGenreOrCategory(value))}
              button
            >
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase()]}
                  className={classes.genreImage}
                  height={25}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader> Genres</ListSubheader>

        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link key={name} className={classes.links} to="/">
              <ListItem
                onClick={() => dispatch(selectGenreOrCategory(id))}
                button
              >
                <ListItemIcon>
                  <img
                    src={genreIcons[name.toLowerCase()]}
                    className={classes.genreImage}
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
