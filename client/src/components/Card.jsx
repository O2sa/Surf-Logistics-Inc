import React from 'react';
import { Card, Text, createStyles } from '@mantine/core';



const CustomCard=({image, title="", color})=> {
  const useStyles = createStyles((theme) => ({
 



    card: {
      position: 'relative',
      // width: 300,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.blue[6],
      color: theme.white,
      overflow: 'hidden',
      transition: 'color 0.5s ',
  
      // Position the overlay image
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'opacity 0.5s ease',
        opacity: 0,
        // zIndex: -1,
      },
  
      '&:hover::before': {
        backgroundImage: `url(${image})`,
        opacity: 1,
      },
  
      '&:hover $text': {
        color: theme.colors.yellow[4],
        borderBottomColor: theme.colors.yellow[4],
      },
    },
  
    text: {
      fontSize: theme.fontSizes.lg,
      textAlign: 'center',
      borderBottom: `2px solid ${theme.white}`,
      transition: 'color 0.5s ease, border-bottom-color 0.5s ease',
      zIndex:'3'
    },

  }));
  const { classes } = useStyles();

  return (
    <Card className={classes.card}>
      <Text className={classes.text}>Hover Over Me</Text>
    </Card>
  );
}

export default CustomCard;
