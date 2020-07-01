import React, { FC } from 'react';
import { Dialog, AnywayAppBar } from '../atoms';
import { Box, makeStyles, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { highlightDarkColor, closeButtonColor, primaryColor } from '../../style';

interface IProps {
  title: string;
  isShowing: boolean;
  onClose: () => any;
}
const useStyles = makeStyles({
  dialog: {
    width: '600px',
  },
  bar: {
    display: 'flex',
    width: 'inherit',
    color: primaryColor,
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '17px',
  },
  close: {
    color: closeButtonColor,
  },
  content: {
    padding: '22px 28px',
  },
});
const DialogWithHeader: FC<IProps> = ({ onClose, isShowing, title, children }) => {
  const classes = useStyles();
  return (
    <Dialog isShowing={isShowing} onClose={onClose}>
      <Box className={classes.dialog}>
        {/* <AnywayAppBar className={classes.header}> */}
        <AnywayAppBar>
          <Box className={classes.bar}>
            {title}
            <IconButton onClick={onClose} className={classes.close}>
              <CloseIcon>close the dialog</CloseIcon>
            </IconButton>
          </Box>
        </AnywayAppBar>
        <Box className={classes.content} display="flex" flexDirection="column" p={2}>
          {children}
        </Box>
      </Box>
    </Dialog>
  );
};

export default DialogWithHeader;
