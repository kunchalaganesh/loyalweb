import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { useNavigate } from "react-router-dom";

const ResponsiveDrawer = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };
  const navigate = useNavigate();
  return (
    <>
      <IconButton
        style={{
          color: "white",
          transition: "transform 0.3s ease",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        }}
        onClick={toggleDrawer}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      <Drawer
        anchor="top"
        open={isOpen}
        onClose={toggleDrawer}
        variant="temporary"
      >
        <div
          className="responsiveDrawerMainOuterBox"
          style={{ width: "300px" }}
        >
          {/* <h2>Menu</h2> */}
          <List>
            {categories.map((category) => (
              <div key={category.id}>
                <ListItem
                  style={{ paddingLeft: "30px", fontWeight: "bold" }}
                  button
                  onClick={() => handleCategoryClick(category)}
                >
                  <ListItemText primary={category.name} />
                </ListItem>
                <Collapse
                  in={selectedCategory === category}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {category.items.map((item) => (
                      <ListItem
                        onClick={() => navigate(item.linkto)}
                        key={item.id}
                        button
                      >
                        <ListItemText
                          style={{ paddingLeft: "50px" }}
                          primary={item.name}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </div>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default ResponsiveDrawer;
