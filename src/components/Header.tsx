import { useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { authService } from "../api/authService";
import { clearUser } from "../store/slices/authSlice";
import { setToast } from "../store/slices/configSlice";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useSelector((store: RootState) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const NAV_ITEMS = [
    { name: "Home", path: "/", show: true },
    { name: "Dashboard", path: "/dashboard", show: isAuthenticated },
    { name: "Layouts", path: "/layouts", show: isAuthenticated },
  ] as const;

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(clearUser());
      dispatch(
        setToast({
          open: true,
          message: "Logged out successfully",
          severity: "success",
        })
      );
      navigate("/");
    } catch (error) {
      // console.error('Error logging out:', error);
      dispatch(
        setToast({
          open: true,
          message: "Error logging out",
          severity: "error",
        })
      );
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        CV Builder
      </Typography>
      <List>
        {NAV_ITEMS.map((page) => {
          if (page.show) {
            return (
              <ListItemButton
                key={page.name}
                component={Link}
                to={page.path}
                selected={location.pathname === page.path}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "rgba(25, 118, 210, 0.08)",
                  },
                }}
              >
                <ListItemText primary={page.name} />
              </ListItemButton>
            );
          }
        })}
      </List>
      {isAuthenticated && (
        <Button
          component={Link}
          to="/"
          onClick={handleLogout}
          color="error"
          sx={{ marginLeft: "auto" }}
        >
          Logout
        </Button>
      )}
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo - Desktop */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "primary.main",
              textDecoration: "none",
            }}
          >
            CV Builder
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleDrawerToggle}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better mobile performance
              }}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
              }}
            >
              {drawer}
            </Drawer>
          </Box>

          {/* Logo - Mobile */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "primary.main",
              textDecoration: "none",
            }}
          >
            CV Builder
          </Typography>

          {/* Desktop Menu */}
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 2 }}
          >
            {NAV_ITEMS.map((page) => {
              if (page.show) {
                return (
                  <Button
                    key={page.name}
                    component={Link}
                    to={page.path}
                    sx={{
                      color: "text.primary",
                      display: "block",
                      fontWeight: location.pathname === page.path ? 600 : 400,
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        width: location.pathname === page.path ? "100%" : "0%",
                        height: "2px",
                        bottom: 0,
                        left: 0,
                        backgroundColor: "primary.main",
                        transition: "width 0.3s ease-in-out",
                      },
                      "&:hover::after": {
                        width: "100%",
                      },
                    }}
                  >
                    {page.name}
                  </Button>
                );
              }
            })}

            {/* Logout button*/}
            {isAuthenticated && (
              <Button
                component={Link}
                to="/"
                onClick={handleLogout}
                color="error"
                sx={{ marginLeft: "auto" }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
