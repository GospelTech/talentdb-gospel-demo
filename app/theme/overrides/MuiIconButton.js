import palette from '../palette';
import { colors } from '@material-ui/core';

export default {
  root: {
    color: palette.icon,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.03)',
    },
  },
  colorSecondary: {
    '&:hover': {
      backgroundColor: colors.grey,
    },
  },
};
