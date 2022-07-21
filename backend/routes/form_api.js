const express = require('express');
const router = express.Router();
const { Op, Sequelize, QueryTypes } = require('sequelize');
const Activity = require('../models/activity_model');
const Program = require('../models/program_model');
const Competition = require('../models/competition_model');
const FormScienceDay = require('../models/form_science_day_model');
const FormScienceDayRadio = require('../models/form_science_day_radio_model');
const FormScienceDayResponse = require('../models/form_science_day_response_model');
const FormScienceDaySurvey = require('../models/form_science_day_survey_model');
const FormActivity = require('../models/form_activity_model');
const FormActivityRadio = require('../models/form_activity_radio_model');
const FormActivityResponse = require('../models/form_activity_response_model');

// Multi Create Form Radio
async function multiCreateFormRadio(action, formId, radioList) {
  try {
    if (radioList.length) {
      if (action === 'formActivity') {
        for await (const [i] of radioList.entries()) {
          await FormActivityRadio.create({
            form_activity_id: formId,
            name: radioList[i].name,
          });
        }
      }
      if (action === 'formScienceDay') {
        for await (const [i] of radioList.entries()) {
          await FormScienceDayRadio.create({
            form_science_day_id: formId,
            name: radioList[i].name,
          });
        }
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error.name;
  }
}

// Multi Update Form Radio
async function multiUpdateFormRadio(action, radioList) {
  try {
    if (radioList.length) {
      if (action === 'formActivity') {
        for await (const [i] of radioList.entries()) {
          await FormActivityRadio.update(
            {
              name: radioList[i].name,
            },
            {
              where: { form_activity_radio_id: radioList[i].form_activity_radio_id },
            }
          );
        }
      }
      if (action === 'formScienceDay') {
        for await (const [i] of radioList.entries()) {
          await FormScienceDayRadio.update(
            {
              name: radioList[i].name,
            },
            {
              where: { form_science_day_radio_id: radioList[i].form_science_day_radio_id },
            }
          );
        }
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error.name;
  }
}

// Multi Delete Form Radio
async function multiDeleteFormRadio(action, radioList) {
  try {
    if (radioList.length) {
      if (action === 'formActivity') {
        for await (const [i] of radioList.entries()) {
          await FormActivityRadio.destroy({
            where: { form_activity_radio_id: radioList[i].form_activity_radio_id },
          });
        }
      }
      if (action === 'formScienceDay') {
        for await (const [i] of radioList.entries()) {
          await FormScienceDayRadio.destroy({
            where: { form_science_day_radio_id: radioList[i].form_science_day_radio_id },
          });
        }
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error.name;
  }
}

// POST: Add Form Science Day
router.post('/form-science-day', async (req, res) => {
  try {
    const { no, type, name, required, radio_list } = req.body;
    if (type == 1 || type == 3) {
      const result = await FormScienceDay.create(req.body);
      res.json({ status: true, data: result });
    } else if (type == 2) {
      const result = await FormScienceDay.create({
        no: no,
        type: type,
        name: name,
        required: required,
      });
      const formScienceDayId = await result?.form_science_day_id;
      // wait create form science day radio
      await multiCreateFormRadio('formScienceDay', formScienceDayId, radio_list);
      // res
      res.json({ status: true, data: null });
    } else {
      res.json({ status: false, data: null });
    }
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Form Science Day
router.get('/form-science-day', async (req, res) => {
  try {
    const result = await FormScienceDay.findAll({
      include: {
        model: FormScienceDayRadio,
        require: false,
        include: {
          model: FormScienceDay,
          require: false,
          attributes: ['required'],
        },
      },
      order: [
        ['no', 'ASC'],
        [FormScienceDayRadio, 'form_science_day_radio_id', 'ASC'],
      ],
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Form Science Day By Id
router.get('/form-science-day/:id', async (req, res) => {
  try {
    const result = await FormScienceDay.findOne({
      where: { form_science_day_id: req.params.id },
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// PUT: Update Form Science Day
router.put('/form-science-day/:id', async (req, res) => {
  try {
    // wait update current form science day
    await FormScienceDay.update(
      {
        no: req.body.no,
        type: req.body.type,
        name: req.body.name,
        required: req.body.required,
      },
      {
        where: { form_science_day_id: req.params.id },
      }
    );
    // wait create form science day radio
    await multiCreateFormRadio('formScienceDay', req.params.id, req.body.create_radio_list);
    // wait update form science day radio
    await multiUpdateFormRadio('formScienceDay', req.body.update_radio_list);
    // wait delete form science day radio
    await multiDeleteFormRadio('formScienceDay', req.body.delete_radio_list);
    // res
    res.json({ status: true, data: null });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// DELETE: Delete Form Science Day
router.delete('/form-science-day/:id', async (req, res) => {
  try {
    // get original
    const original = await FormScienceDay.findAll({
      include: {
        model: FormScienceDayRadio,
        require: true,
      },
      where: {
        form_science_day_id: req.params.id,
      },
    });
    // parse to json
    const parseJson = JSON.parse(JSON.stringify(await original));
    const deleteRadioList = await parseJson[0]?.form_science_day_radioes;
    // wait delete form science day radio
    await multiDeleteFormRadio('formScienceDay', deleteRadioList);
    // wait destroy current
    await FormScienceDay.destroy({
      where: { form_science_day_id: req.params.id },
    });
    // res
    res.json({ status: true, data: null });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Form Science Day Survey
router.get('/form-science-day-survey', async (req, res) => {
  try {
    const result = await FormScienceDaySurvey.findAll(req.body);
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// NEXT TO FORM ACTIVITY

// POST: Add Form Activity
router.post('/form-activity', async (req, res) => {
  try {
    const { activity_id, no, type, name, required, radio_list } = req.body;
    if (type == 1 || type == 3) {
      const result = await FormActivity.create(req.body);
      res.json({ status: true, data: result });
    } else if (type == 2) {
      const result = await FormActivity.create({
        activity_id: activity_id,
        no: no,
        type: type,
        name: name,
        required: required,
      });
      const formActivityId = await result?.form_activity_id;
      // wait create form activity day radio
      await multiCreateFormRadio('formActivity', formActivityId, radio_list);
      // res
      res.json({ status: true, data: null });
    } else {
      res.json({ status: false, data: null });
    }
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Form Activity By Member Id
router.get('/form-activity/member/:id', async (req, res) => {
  try {
    const result = await Activity.findAll({
      include: [
        {
          model: FormActivity,
          require: true,
          where: {
            form_activity_id: {
              [Op.ne]: null,
            },
          },
          include: {
            model: FormActivityRadio,
            required: false,
            include: {
              model: FormActivity,
              required: false,
              attributes: ['required'],
            },
          },
        },
        {
          model: Program,
          require: true,
          attributes: ['program_id'],
          include: [
            {
              model: Competition,
              require: true,
              attributes: ['competition_id'],
              where: {
                competition_id: {
                  [Op.ne]: null,
                },
                member_id: {
                  [Op.eq]: req.params.id,
                },
              },
            },
          ],
          where: {
            [Op.and]: [
              {
                program_id: {
                  [Op.ne]: null,
                },
              },
            ],
          },
        },
      ],
      order: [
        [FormActivity, 'no', 'ASC'],
        [[FormActivity, FormActivityRadio, 'form_activity_radio_id', 'ASC']],
      ],
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Activity By Activity Id
router.get('/form-activity/:id', async (req, res) => {
  try {
    const result = await Activity.findOne({
      include: [
        {
          model: FormActivity,
          required: true,
          include: {
            model: FormActivityRadio,
            required: false,
            include: {
              model: FormActivity,
              required: false,
              attributes: ['required'],
            },
          },
        },
      ],
      where: {
        activity_id: req.params.id,
      },
      order: [
        [FormActivity, 'no', 'ASC'],
        [[FormActivity, FormActivityRadio, 'form_activity_radio_id', 'ASC']],
      ],
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// PUT: Update Activity
router.put('/form-activity/:id', async (req, res) => {
  try {
    // wait update current form science day
    await FormActivity.update(
      {
        no: req.body.no,
        type: req.body.type,
        name: req.body.name,
        required: req.body.required,
      },
      {
        where: { form_activity_id: req.params.id },
      }
    );
    // wait create form science day radio
    await multiCreateFormRadio('formActivity', req.params.id, req.body.create_radio_list);
    // wait update form science day radio
    await multiUpdateFormRadio('formActivity', req.body.update_radio_list);
    // wait delete form science day radio
    await multiDeleteFormRadio('formActivity', req.body.delete_radio_list);
    // res
    res.json({ status: true, data: null });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// DELETE: Delete Activity
router.delete('/form-activity/:id', async (req, res) => {
  try {
    // get original
    const original = await FormActivity.findAll({
      include: {
        model: FormActivityRadio,
        require: true,
      },
      where: {
        form_activity_id: req.params.id,
      },
    });
    // parse to json
    const parseJson = JSON.parse(JSON.stringify(await original));
    const deleteRadioList = await parseJson[0]?.form_activity_radioes;
    // wait delete form science day radio
    await multiDeleteFormRadio('formActivity', deleteRadioList);
    // wait destroy current
    await FormActivity.destroy({
      where: { form_activity_id: req.params.id },
    });
    // res
    res.json({ status: true, data: null });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// Create Form Science Response
const createFormScienceDayResponse = async (formScienceDaySurveyId, responseList) => {
  try {
    if (responseList.length) {
      // muiti create
      for (const [i] of responseList.entries()) {
        await FormScienceDayResponse.create({
          form_science_day_survey_id: formScienceDaySurveyId,
          form_science_day_id: responseList[i].form_science_day_id,
          response: responseList[i].response,
        });
      }
      return true;
    } else {
      res.json({ status: false, data: 'เกิดข้อผิดพลาด!' });
    }
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
};

// GET: Get Form Science Day Response
router.get('/form-science-day-response', async (req, res) => {
  try {
    const formResponses = await FormScienceDayResponse.count({
      where: {
        form_science_day_response_id: {
          [Op.ne]: null,
        },
      },
    });
    const rows = await FormScienceDay.findAll({
      include: {
        model: FormScienceDayResponse,
        require: true,
        include: {
          model: FormScienceDay,
          require: true,
          attributes: ['type'],
        },
      },
      order: [['no', 'ASC'], [[FormScienceDayResponse, 'form_science_day_response_id', 'ASC']]],
    });
    const reports = await FormScienceDay.findAll({
      attributes: [
        'form_science_day_id',
        'no',
        'type',
        'name',
        'required',
        'createdAt',
        'updatedAt',
        [Sequelize.fn('COUNT', Sequelize.col('response')), 'form_science_day_responses.count'],
      ],
      group: ['form_science_day_responses.response'],
      include: {
        model: FormScienceDayResponse,
        require: true,
        include: {
          model: FormScienceDay,
          require: true,
          attributes: ['type'],
        },
      },
      order: [['no', 'ASC'], [[FormScienceDayResponse, 'form_science_day_response_id', 'ASC']]],
    });
    res.json({
      status: true,
      data: { form_responses: formResponses, rows: rows, reports: reports },
    });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// ADD: Add Form Science Day Response
router.post('/form-science-day-response', async (req, res) => {
  try {
    const {
      id_card,
      name,
      email,
      phone_number,
      address,
      province,
      district,
      sub_district,
      postcode,
      response_list,
    } = req.body;
    // result
    const result = await FormScienceDaySurvey.create({
      id_card: id_card,
      name: name,
      email: email,
      phone_number: phone_number,
      address: address,
      province: province,
      district: district,
      sub_district: sub_district,
      postcode: postcode,
    });
    const formScienceDaySurveyId = await result?.form_science_day_survey_id;
    // wait create form science day response
    await createFormScienceDayResponse(formScienceDaySurveyId, response_list);
    // response
    res.json({ status: true, data: 'ส่งคำตอบแล้ว' });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// Create Form Activity Response
const createFormActivityResponse = async (memberId, responseList) => {
  try {
    if (responseList.length) {
      // muiti create
      for (const [i] of responseList.entries()) {
        await FormActivityResponse.create({
          member_id: memberId,
          form_activity_id: responseList[i].form_activity_id,
          response: responseList[i].response,
        });
      }
      return true;
    } else {
      res.json({ status: false, data: 'เกิดข้อผิดพลาด!' });
    }
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
};

// ADD: Add Form Activity Response
router.post('/form-activity-response', async (req, res) => {
  try {
    const { member_id, response_list } = req.body;
    // wait create form activity response
    await createFormActivityResponse(member_id, response_list);
    // response
    res.json({ status: true, data: 'ส่งคำตอบแล้ว' });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Form Activity Response By Activity Id
router.get('/form-activity-response/:id', async (req, res) => {
  try {
    const formResponses = await Activity.count({
      include: {
        model: FormActivity,
        require: true,
        include: {
          model: FormActivityResponse,
          require: false,
        },
      },
      where: {
        activity_id: req.params.id,
      },
    });
    const rows = await Activity.findAll({
      include: {
        model: FormActivity,
        require: true,
        include: {
          model: FormActivityResponse,
          require: false,
          include: {
            model: FormActivity,
            require: false,
            attributes: ['type'],
          },
        },
      },
      where: {
        activity_id: req.params.id,
      },
      order: [
        [FormActivity, 'no', 'ASC'],
        [[FormActivity, FormActivityResponse, 'form_activity_response_id', 'ASC']],
      ],
    });
    const reports = await Activity.findAll({
      include: {
        model: FormActivity,
        require: true,
        attributes: [
          'form_activity_id',
          'activity_id',
          'no',
          'type',
          'name',
          'required',
          'createdAt',
          'updatedAt',
          [Sequelize.fn('COUNT', Sequelize.col('response')), 'form_activity_responses.count'],
        ],
        include: {
          model: FormActivityResponse,
          require: false,
          include: {
            model: FormActivity,
            require: false,
            attributes: ['type'],
          },
        },
      },
      group: [['form_activities.form_activity_responses.response']],
      where: {
        activity_id: req.params.id,
      },
      order: [
        [FormActivity, 'no', 'ASC'],
        [[FormActivity, FormActivityResponse, 'form_activity_response_id', 'ASC']],
      ],
    });
    res.json({
      status: true,
      data: { form_responses: formResponses, rows: rows, reports: reports },
    });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

module.exports = router;
