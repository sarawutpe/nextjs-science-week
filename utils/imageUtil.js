import { IMAGE_URL } from 'utils/constants';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';

const imageUtil = {
  getImage: (image) => {
    if (image) {
      return `${IMAGE_URL}/${image}`;
    } else {
      return '';
    }
  },
  getPreviewObj: (obj, image) => {
    if (obj) {
      return obj;
    } else if (image) {
      return `${IMAGE_URL}/${image}`;
    } else {
      return '';
    }
  },
};

export default imageUtil;
