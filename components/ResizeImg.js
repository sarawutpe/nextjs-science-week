import React, { useState } from 'react';
import Image from 'next/image';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const ResizeImg = (props) => {
  const [resize, setResize] = useState(false);
  const handleResize = () => {
    setResize((v) => !v);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '400px',
    minHeight: '400px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const { src } = props;
  return (
    <>
      {/* original */}
      <Image
        className="resize"
        onClick={handleResize}
        src={src}
        alt="proof of payment"
        width={50}
        height={60}
      />
      {/* resize */}
      <Modal open={resize} onClose={handleResize}>
        <Box sx={style}>
          <Image
            layout="responsive"
            src={src}
            alt="proof of payment"
            width={500}
            height={500}
            objectFit="contain"
          />
        </Box>
      </Modal>
    </>
  );
};

export default ResizeImg;
