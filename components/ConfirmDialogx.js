import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmDialog = (props) => {
  const { content, openConfirmDialog, closeConfirmDialog, confirm } = props;
  return (
    <Dialog
      // open={openConfirmDialog}
      // onClose={closeConfirmDialog}
      // onKeyUp={(e) => {
      //   if (e.key === 'Enter') {
      //     confirm();
      //     closeConfirmDialog();
      //   }
      // }}
    >
      <DialogTitle id="title">{'แจ้งเตือน'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="content">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button
          type="button"
          variant="text"
          size="small"
          // onClick={closeConfirmDialog}
        >
          ยกเลิก
        </Button>
      <Button
          type="submit"
          variant="contained"
          size="small"
          // onClick={() => {
          //   confirm();
          //   closeConfirmDialog();
          // }}
        >
          ยืนยัน
        </Button>
        
      </DialogActions>
      {/* </form> */}
    </Dialog>
  );
};

export default ConfirmDialog;
