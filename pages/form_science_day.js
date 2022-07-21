import React, { Fragment, useState, useMemo, useEffect, useRef } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import actions from 'redux/actions';
import _ from 'lodash';
import MainLayout from 'templates/MainLayout/Index';
import Loading from 'components/Loading';
import { mainMenu } from 'utils/configMenu';
import pdfMake from 'utils/pdfmake';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const FormScienceDay = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  // form ref
  const formRef = useRef([]);

  // initial state
  useEffect(() => {
    dispatch(actions.getProgramRequest());
    dispatch(actions.getFormScienceDayRequest());
    dispatch(actions.getCertificateByTypeRequest());
    // clear
    personalDetailFormik.handleReset();
    formScienceDayFormik.handleReset();
    setTabPanel('1');
  }, [router, user]);

  // global state
  const getFormScienceDayState = useSelector(
    ({ getFormScienceDayReducer }) => getFormScienceDayReducer
  );
  const addFormScienceDayResponseState = useSelector(
    ({ addFormScienceDayResponseReducer }) => addFormScienceDayResponseReducer
  );
  const getCertificateByTypeState = useSelector(
    ({ getCertificateByTypeReducer }) => getCertificateByTypeReducer
  );

  const [certificateDetail, setCertificateDetail] = useState({ name: '', docCertificate: {} });

  // tabs
  const [tabPanel, setTabPanel] = useState('1');
  // handle change tab
  const handleChangeTab = (event, newTab) => {
    setTabPanel(newTab);
  };

  // personal detail personalDetailFormik
  const personalDetailFormik = useFormik({
    initialValues: {
      id_card: '',
      name: '',
      email: '',
      phone_number: '',
      address: '',
      sub_district: '',
      district: '',
      province: '',
      postcode: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.id_card) {
        errors.id_card = 'จำเป็นต้องใช้';
      } else if (!/^[0-9]{13}$/i.test(values.id_card)) {
        errors.id_card = 'รูปแบบไม่ถูกต้อง';
      }
      if (!values.name) {
        errors.name = 'จำเป็นต้องใช้';
      }
      if (!values.email) {
        errors.email = 'จำเป็นต้องใช้';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'รูปแบบไม่ถูกต้อง';
      }
      if (!values.phone_number) {
        errors.phone_number = 'จำเป็นต้องใช้';
      } else if (!/^0[0-9]{9}$/i.test(values.phone_number)) {
        errors.phone_number = 'รูปแบบไม่ถูกต้อง';
      }
      if (!values.address) {
        errors.address = 'จำเป็นต้องใช้';
      }
      if (!values.sub_district) {
        errors.sub_district = 'จำเป็นต้องใช้';
      } else if (!/^ตำบล/i.test(values.sub_district)) {
        errors.sub_district = 'ขึ้นต้นด้วยตำบล';
      }
      if (!values.district) {
        errors.district = 'จำเป็นต้องใช้';
      } else if (!/^เขต|อำเภอ/i.test(values.district)) {
        errors.district = 'ขึ้นต้นด้วยเขตหรืออำเภอ';
      }
      if (!values.province) {
        errors.province = 'จำเป็นต้องใช้';
      } else if (!/^จังหวัด/i.test(values.province)) {
        errors.province = 'ขึ้นต้นด้วยจังหวัด';
      }
      if (!values.postcode) {
        errors.postcode = 'จำเป็นต้องใช้';
      } else if (!/^[0-9]{5}$/i.test(values.postcode)) {
        errors.postcode = 'รูปแบบไม่ถูกต้อง';
      }
      return errors;
    },
    onSubmit: (values) => {
      var certificateImg = [
        {
          image: getCertificateByTypeState?.result?.data?.img_base64_type3 ?? '',
          width: 842,
          height: 595,
        },
      ];
      if (certificateImg[0].image) {
        docCertificate.background = certificateImg;
      }
      docCertificate.content[0].text = values.name;
      setCertificateDetail({ docCertificate: docCertificate });
      setTabPanel('2');
    },
  });

  const disabledPersonalDetail = () => {
    if (
      !personalDetailFormik.isValid ||
      !personalDetailFormik.values.id_card ||
      !personalDetailFormik.values.name ||
      !personalDetailFormik.values.email ||
      !personalDetailFormik.values.phone_number ||
      !personalDetailFormik.values.address ||
      !personalDetailFormik.values.province ||
      !personalDetailFormik.values.district ||
      !personalDetailFormik.values.sub_district ||
      !personalDetailFormik.values.postcode
    ) {
      return true;
    } else {
      return false;
    }
  };

  // form science day personalDetailFormik
  const formScienceDayFormik = useFormik({
    enableReinitialize: true,
    initialValues: {},
    validate: () => {
      const errors = {};
      return errors;
    },
    onSubmit: () => {
      const responseList = [];
      for (let i = 0; i < formRef.current.length; i++) {
        const input = formRef.current[i].type;
        // for input type text, textarea
        if (input === 'text' || input === 'textarea') {
          responseList.push({
            form_science_day_id: formRef.current[i].id,
            response: formRef.current[i].value.trim() || '-',
          });
        } else {
          // for input type radio
          for (let j = 0; j < formRef.current[i].children.length; j++) {
            if (formRef.current[i].children[j].control.checked) {
              responseList.push({
                form_science_day_id: formRef.current[i].children[j].id,
                response: formRef.current[i].children[j].control.value || '-',
              });
            }
          }
        }
      }
      // create data
      const data = {
        id_card: personalDetailFormik.values.id_card,
        name: personalDetailFormik.values.name,
        email: personalDetailFormik.values.email,
        phone_number: personalDetailFormik.values.phone_number,
        address: personalDetailFormik.values.address,
        province: personalDetailFormik.values.province,
        district: personalDetailFormik.values.district,
        sub_district: personalDetailFormik.values.sub_district,
        postcode: personalDetailFormik.values.postcode,
        response_list: responseList,
      };
      dispatch(actions.addFormScienceDayResponseRequest(data));
      downloadCertificatePDF(certificateDetail.docCertificate);
    },
  });

  // doc certificate
  const docCertificate = {
    pageSize: 'A4',
    pageOrientation: 'landscape',
    pageMargins: [40, 60, 40, 60],
    background: [],
    content: [
      {
        text: '',
        fontSize: 25,
        bold: true,
        color: '#7D3A01',
        alignment: 'center',
        margin: [0, 170, 0, 0],
      },
      {
        text: `ได้เข้าร่วมกิจกรรมสัปดาห์วิทยาศาสตร์แห่งชาติ ประจำปี ${
          new Date().getFullYear() + 543
        }`,
        fontSize: 23,
        bold: true,
        color: '#7D3A01',
        alignment: 'center',
        margin: [0, 5, 0, 0],
      },
    ],
    defaultStyle: {
      font: 'THSarabunNew',
      fontSize: 16,
    },
    styles: {
      header: {
        fontSize: 20,
        bold: true,
      },
      subheader: {
        fontSize: 16,
        bold: true,
      },
    },
  };

  // download pdf button
  function downloadCertificatePDF(doc) {
    pdfMake.createPdf(doc).download(`cert_${Date.now()}`);
  }

  return (
    <MainLayout menu={mainMenu}>
      <Typography variant="h6" sx={{ paddingBottom: 2 }}>
        {`แบบประเมินความพึงพอใจผู้เข้าร่วมงานสัปดาห์วิทยาศาสตร์ ${new Date().getFullYear() + 543}`}
      </Typography>

      {getFormScienceDayState.result?.data?.length ? (
        <TabContext value={tabPanel}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList aria-label="tabs">
              <Tab disabled label="ข้อมูลส่วนตัว" value="1" />
              <Tab disabled label="แบบประเมิน" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Fragment>
              <form onSubmit={personalDetailFormik.handleSubmit}>
                <CardContent>
                  <TextField
                    type="text"
                    variant="outlined"
                    label="บัตรประชาชน"
                    size="small"
                    margin="dense"
                    fullWidth
                    name="id_card"
                    value={personalDetailFormik.values.id_card}
                    helperText={
                      personalDetailFormik.touched.id_card && personalDetailFormik.errors.id_card
                    }
                    onChange={personalDetailFormik.handleChange}
                    onBlur={personalDetailFormik.handleBlur}
                  />
                  <TextField
                    type="text"
                    variant="outlined"
                    label="ชื่อ-นามสกุล"
                    size="small"
                    margin="dense"
                    fullWidth
                    name="name"
                    value={personalDetailFormik.values.name}
                    helperText={
                      personalDetailFormik.touched.name && personalDetailFormik.errors.name
                    }
                    onChange={personalDetailFormik.handleChange}
                    onBlur={personalDetailFormik.handleBlur}
                  />
                  <TextField
                    type="text"
                    variant="outlined"
                    label="อีเมล"
                    size="small"
                    margin="dense"
                    name="email"
                    fullWidth
                    value={personalDetailFormik.values.email}
                    helperText={
                      personalDetailFormik.touched.email && personalDetailFormik.errors.email
                    }
                    onChange={personalDetailFormik.handleChange}
                    onBlur={personalDetailFormik.handleBlur}
                  />
                  <TextField
                    type="text"
                    variant="outlined"
                    label="โทรศัพท์"
                    size="small"
                    margin="dense"
                    name="phone_number"
                    fullWidth
                    value={personalDetailFormik.values.phone_number}
                    helperText={
                      personalDetailFormik.touched.phone_number &&
                      personalDetailFormik.errors.phone_number
                    }
                    onChange={personalDetailFormik.handleChange}
                    onBlur={personalDetailFormik.handleBlur}
                  />

                  <TextField
                    type="text"
                    variant="outlined"
                    label="ที่อยู่"
                    size="small"
                    margin="dense"
                    name="address"
                    fullWidth
                    value={personalDetailFormik.values.address}
                    helperText={
                      personalDetailFormik.touched.address && personalDetailFormik.errors.address
                    }
                    onChange={personalDetailFormik.handleChange}
                    onBlur={personalDetailFormik.handleBlur}
                  />
                  <TextField
                    type="text"
                    variant="outlined"
                    label="ตำบล"
                    size="small"
                    margin="dense"
                    name="sub_district"
                    fullWidth
                    value={personalDetailFormik.values.sub_district}
                    helperText={
                      personalDetailFormik.touched.sub_district &&
                      personalDetailFormik.errors.sub_district
                    }
                    onChange={personalDetailFormik.handleChange}
                    onBlur={personalDetailFormik.handleBlur}
                  />
                  <TextField
                    type="text"
                    variant="outlined"
                    label="อำเภอ"
                    size="small"
                    margin="dense"
                    name="district"
                    fullWidth
                    value={personalDetailFormik.values.district}
                    helperText={
                      personalDetailFormik.touched.district && personalDetailFormik.errors.district
                    }
                    onChange={personalDetailFormik.handleChange}
                    onBlur={personalDetailFormik.handleBlur}
                  />
                  <TextField
                    type="text"
                    variant="outlined"
                    label="จังหวัด"
                    size="small"
                    margin="dense"
                    name="province"
                    fullWidth
                    value={personalDetailFormik.values.province}
                    helperText={
                      personalDetailFormik.touched.province && personalDetailFormik.errors.province
                    }
                    onChange={personalDetailFormik.handleChange}
                    onBlur={personalDetailFormik.handleBlur}
                  />
                  <TextField
                    type="text"
                    variant="outlined"
                    label="รหัสไปรษณีย์"
                    size="small"
                    margin="dense"
                    name="postcode"
                    fullWidth
                    value={personalDetailFormik.values.postcode}
                    helperText={
                      personalDetailFormik.touched.postcode && personalDetailFormik.errors.postcode
                    }
                    onChange={personalDetailFormik.handleChange}
                    onBlur={personalDetailFormik.handleBlur}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={disabledPersonalDetail()}
                  >
                    ต่อไป
                  </Button>
                </CardActions>
              </form>
            </Fragment>
          </TabPanel>
          <TabPanel value="2">
            <Fragment>
              {getFormScienceDayState.isFetching ? (
                <Loading />
              ) : (
                <form onSubmit={formScienceDayFormik.handleSubmit}>
                  {getFormScienceDayState.result?.data?.map((row, index) => (
                    <Card key={index} sx={{ mb: 2, p: 2 }}>
                      <Typography variant="subtitle1">{row.name}</Typography>
                      {row.type == 1 ? (
                        <>
                          <TextField
                            type="text"
                            variant="outlined"
                            label="คำตอบของคุณ"
                            size="small"
                            margin="dense"
                            fullWidth
                            required={row.required ? true : false}
                            inputRef={(element) => (formRef.current[index] = element)}
                            inputProps={{
                              id: row.form_science_day_id,
                            }}
                          />
                        </>
                      ) : row.type == 2 ? (
                        <>
                          <FormControl>
                            <RadioGroup ref={(element) => (formRef.current[index] = element)}>
                              {row.form_science_day_radioes.map((row, key) => (
                                <FormControlLabel
                                  id={row.form_science_day_id}
                                  key={key}
                                  value={row.name}
                                  control={
                                    <Radio
                                      required={row.form_science_day?.required ? true : false}
                                    />
                                  }
                                  label={row.name}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </>
                      ) : row.type == 3 ? (
                        <>
                          <TextField
                            type="text"
                            variant="outlined"
                            label="คำตอบของคุณ"
                            size="small"
                            margin="dense"
                            name="address"
                            multiline
                            minRows={2}
                            maxRows={3}
                            fullWidth
                            required={row.required ? true : false}
                            inputRef={(element) => (formRef.current[index] = element)}
                            inputProps={{
                              id: row.form_science_day_id,
                            }}
                          />
                        </>
                      ) : (
                        <></>
                      )}
                    </Card>
                  ))}
                  {getFormScienceDayState.isSuccess &&
                  getFormScienceDayState.result?.data?.length != 0 ? (
                    <Stack spacing={2} direction="row">
                      <Button
                        type="button"
                        variant="contained"
                        color="success"
                        onClick={() => handleChangeTab(_, '1')}
                      >
                        แก้ไขข้อมูล
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={addFormScienceDayResponseState.isFetching}
                      >
                        ส่ง
                      </Button>
                    </Stack>
                  ) : (
                    <></>
                  )}
                </form>
              )}
            </Fragment>
          </TabPanel>
        </TabContext>
      ) : (
        <></>
      )}
    </MainLayout>
  );
};

export default FormScienceDay;
