import { memo } from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, useTheme, useMediaQuery } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const SOCIAL_LINKS = [
  { icon: FacebookIcon, label: 'Facebook' },
  { icon: TwitterIcon, label: 'Twitter' },
  { icon: LinkedInIcon, label: 'LinkedIn' },
  { icon: InstagramIcon, label: 'Instagram' },
] as const;

const FOOTER_LINKS = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Templates', href: '/templates' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'FAQ', href: '/faq' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
} as const;

const LinkSection = memo(({ title, links }: { title: string; links: typeof FOOTER_LINKS.product }) => (
  <Grid item xs={12} sm={6} md={2}>
    <Typography variant="h6" color="white" gutterBottom>
      {title}
    </Typography>
    {links.map((link) => (
      <Link
        key={link.name}
        href={link.href}
        color="inherit"
        sx={{
          display: 'block',
          mb: 1,
          textDecoration: 'none',
          '&:hover': {
            color: 'primary.main',
          },
        }}
      >
        {link.name}
      </Link>
    ))}
  </Grid>
));

LinkSection.displayName = 'LinkSection';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[900],
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and Description */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="white" gutterBottom>
              CV Builder
            </Typography>
            <Typography variant="body2" color="grey.400" sx={{ mb: 2 }}>
              Create professional CVs in minutes with our easy-to-use builder. Stand out from the crowd and land your dream job.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {SOCIAL_LINKS.map(({ icon: Icon, label }) => (
                <IconButton
                  key={label}
                  color="inherit"
                  aria-label={label}
                  component="a"
                  href={`https://${label.toLowerCase()}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Links */}
          <LinkSection title="Product" links={FOOTER_LINKS.product} />
          <LinkSection title="Company" links={FOOTER_LINKS.company} />
          <LinkSection title="Legal" links={FOOTER_LINKS.legal} />
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            mt: 5,
            pt: 3,
            borderTop: '1px solid',
            borderColor: 'grey.800',
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          <Typography variant="body2" color="grey.400">
            © {new Date().getFullYear()} CV Builder. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default memo(Footer);
