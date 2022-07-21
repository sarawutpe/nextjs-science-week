const express = require('express');
const router = express.Router();
const { Op, Sequelize, QueryTypes, where, json } = require('sequelize');
const Activity = require('../models/activity_model');
const ActivityLevel = require('../models/activty_level_model');
const Program = require('../models/program_model');
const Coordinator = require('../models/coordinator_model');
const Documents = require('../models/documents_model');
const Links = require('../models/links_model');
const Advisor = require('../models/advisor_model');
const Participant = require('../models/participant_model');
const Competition = require('../models/competition_model');
const AwardLevel = require('../models/award_level_model');
const CompetitionResult = require('../models/competition_results_model');
const Member = require('../models/member_model');
const School = require('../models/school_model');
const formidable = require('formidable');
const uploadFile = require('../utils/upload_file');

// Check local advisor or participant exists
const checkLocalAdvisorOrParticipantExists = async (advisorList, participantList) => {
  // check advisors
  const advisors = [];
  for await (const [i] of advisorList.entries()) {
    if (i == 0) {
      advisors.push(advisorList[i].advisor_name);
    } else {
      if (advisors.includes(advisorList[i].advisor_name)) {
        return {
          status: false,
          data: 'ไม่สามารถสมัครเข้าร่วมได้ เนื่องจากรายชื่ออาจารย์ที่ปรึกษาซ้ำกัน',
        };
      } else {
        advisors.push(advisorList[i].advisor_name);
      }
    }
  }
  // check participants
  const participants = [];
  for await (const [i] of participantList.entries()) {
    if (i == 0) {
      participants.push(participantList[i].participant_name);
    } else {
      if (participants.includes(participantList[i].participant_name)) {
        return {
          status: false,
          data: 'ไม่สามารถสมัครเข้าร่วมได้ เนื่องจากรายชื่อผู้สมัครเข้าร่วมกิจกรรมซ้ำกัน',
        };
      } else {
        participants.push(participantList[i].participant_name);
      }
    }
  }
  return { status: true, data: null };
};

// Check participant exists
const checkParticipantExists = async (programId, schoolId, participantList) => {
  try {
    const newParticipantList = [];
    for await (const [i] of participantList.entries()) {
      newParticipantList.push(participantList[i].participant_name);
    }
    const useSchool = false;
    const result = await Competition.findAll({
      include: [
        {
          model: Member,
          require: true,
          include: {
            model: School,
            require: true,
            where: useSchool && {
              school_id: {
                [Op.eq]: schoolId,
              },
            },
          },
          where: useSchool && {
            school_id: {
              [Op.ne]: null,
            },
          },
        },
        {
          model: Participant,
          require: true,
          where: {
            participant_name: {
              [Op.in]: newParticipantList,
            },
          },
        },
      ],
      where: {
        program_id: programId,
      },
    });
    if (await result.length) {
      return {
        status: false,
        data: 'ไม่สามารถสมัครเข้าร่วมได้ เนื่องจากชื่อผู้สมัครซ้ำในโปรแกรมนี้',
      };
    } else {
      return { status: true, data: null };
    }
  } catch (error) {
    return { status: false, data: error.name };
  }
};

// Check limit join program
const checkLimitJoinProgram = async (
  schoolId,
  schoolType,
  programId,
  limitPerSchool,
  limitPerProgram
) => {
  try {
    // wait count limit per school
    const countLimitPerSchool = await Competition.count({
      include: [
        {
          model: Member,
          require: true,
          include: {
            model: School,
            require: true,
            where: {
              school_id: {
                [Op.eq]: schoolId,
              },
            },
          },
          where: {
            school_id: {
              [Op.ne]: null,
            },
          },
        },
      ],
      where: {
        program_id: programId,
      },
    });

    // wait count limit per participnat
    const countlimitPerProgram = await Competition.count({
      where: {
        program_id: programId,
      },
    });
    // response
    if (
      countLimitPerSchool >= limitPerSchool &&
      limitPerSchool > 0 &&
      schoolType != 0 &&
      countlimitPerProgram >= limitPerProgram &&
      limitPerProgram > 0
    ) {
      return {
        status: false,
        data: 'ไม่สามารถสมัครเข้าร่วมได้เนื่องจากเกินจำนวนต่อโรงเรียน และเกินจำนวนผู้เข้าร่วมโปรแกรม',
      };
    } else if (countLimitPerSchool >= limitPerSchool && limitPerSchool > 0 && schoolType != 0) {
      return {
        status: false,
        data: 'ไม่สามารถสมัครเข้าร่วมได้ เนื่องจากเกินจำนวนต่อโรงเรียนนี้',
      };
    } else if (countlimitPerProgram >= limitPerProgram && limitPerProgram > 0) {
      return {
        status: false,
        data: 'ไม่สามารถสมัครเข้าร่วมได้ เนื่องจากเกินจำนวนผู้เข้าร่วมโปรแกรมนี้',
      };
    }
    return { status: true, data: null };
  } catch (error) {
    return { status: false, data: error.name };
  }
};

// Multi Create Advisor
const multiCreateAdvisor = async (advisorList, competitionId) => {
  try {
    if (advisorList.length) {
      for await (const [i] of advisorList.entries()) {
        await Advisor.create({
          competition_id: competitionId,
          advisor_name: advisorList[i].advisor_name,
        });
      }
      return { status: true, data: null };
    } else {
      return { status: false, data: null };
    }
  } catch (error) {
    return { status: false, data: error.name };
  }
};

// Multi Create Participant
const multiCreateParticipant = async (participantList, competitionId) => {
  try {
    if (participantList.length) {
      // multi create
      for await (const [i] of participantList.entries()) {
        await Participant.create({
          competition_id: competitionId,
          participant_name: participantList[i].participant_name,
          participant_active: false,
        });
      }
      return { status: true, data: null };
    } else {
      return { status: false, data: null };
    }
  } catch (error) {
    return { status: false, data: error.name };
  }
};

// ADD: Add competition
router.post('/competition', async (req, res) => {
  try {
    const {
      school_id,
      school_type,
      program_id,
      limit_per_school,
      limit_per_program,
      advisor_list,
      participant_list,
    } = req.body;

    // wait check local advisor and participant exists
    const localAdvisorOrParticipantExists = await checkLocalAdvisorOrParticipantExists(
      advisor_list,
      participant_list
    );
    if (!localAdvisorOrParticipantExists.status) {
      return res.send(localAdvisorOrParticipantExists);
    }

    // wait check participant exists
    const participantExists = await checkParticipantExists(program_id, school_id, participant_list);
    if (!participantExists.status) {
      return res.send(participantExists);
    }

    if (true) {
      // wait check limit join program
      const limitJoinProgram = await checkLimitJoinProgram(
        school_id,
        school_type,
        program_id,
        limit_per_school,
        limit_per_program
      );
      // if everything is good
      if (limitJoinProgram.status) {
        const createCompetitionResult = await Competition.create(req.body);
        const competitionId = await createCompetitionResult.competition_id;
        // await create advisor
        await multiCreateAdvisor(advisor_list, competitionId);
        // await create participant
        await multiCreateParticipant(participant_list, competitionId);
        // response
        res.json({ status: true, data: 'สมัครเข้าร่วมกิจกรรมสำเร็จ' });
      } else {
        return res.send(limitJoinProgram);
      }
    }
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get competition
router.get('/competition/:id', async (req, res) => {
  try {
    const result = await Competition.findOne({
      include: [
        {
          model: Participant,
          require: true,
        },
      ],
      where: {
        competition_id: req.params.id,
      },
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get competition By Id
router.get('/competition/:id', async (req, res) => {
  try {
    const search = req.query.search;
    const result = await Activity.findAll({
      include: [
        {
          model: Program,
          require: true,
          include: [
            {
              model: ActivityLevel,
              require: true,
            },
            {
              model: Competition,
              require: true,
              where: {
                competition_id: {
                  [Op.ne]: null,
                },
                member_id: {
                  [Op.eq]: req.params.id,
                },
              },
              include: {
                model: Participant,
                require: true,
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
      where: search && {
        [Op.or]: [
          {
            activity_name: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
    });
    // response
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// Multi Update Advisor
const multiUpdateAdvisor = async (advisorList) => {
  try {
    if (advisorList.length) {
      for await (const [i] of advisorList.entries()) {
        await Advisor.update(advisorList[i], {
          where: { advisor_id: advisorList[i].advisor_id },
        });
      }
      return { status: true, data: null };
    } else {
      return { status: false, data: null };
    }
  } catch (error) {
    return { status: false, data: error.name };
  }
};

// Multi Delete Advisor
const multiDeleteAdvisor = async (advisorList) => {
  try {
    if (advisorList.length) {
      for await (const [i] of advisorList.entries()) {
        await Advisor.destroy({
          where: { advisor_id: advisorList[i].advisor_id },
        });
      }
      return { status: true, data: null };
    } else {
      return { status: false, data: null };
    }
  } catch (error) {
    return { status: false, data: error.name };
  }
};

// Multi Update Participant
const multiUpdateParticipant = async (participantList) => {
  try {
    if (participantList.length) {
      for await (const [i] of participantList.entries()) {
        await Participant.update(participantList[i], {
          where: {
            participant_id: participantList[i].participant_id,
          },
        });
      }
      return { status: true, data: null };
    } else {
      return { status: false, data: null };
    }
  } catch (error) {
    return { status: false, data: error.name };
  }
};

// Multi Delete Participant
const multiDeleteParticipant = async (participantList) => {
  try {
    if (participantList.length) {
      for await (const [i] of participantList.entries()) {
        await Participant.destroy({
          where: { participant_id: participantList[i].participant_id },
        });
      }
      return { status: true, data: null };
    } else {
      return { status: false, data: null };
    }
  } catch (error) {
    return { status: false, data: error.name };
  }
};

// Check participant exists
const checkUpdateParticipantExists = async (programId, schoolId, participantList) => {
  try {
    const newParticipantListId = [];
    for await (const [i] of participantList.entries()) {
      if (participantList[i].participant_id) {
        newParticipantListId.push(participantList[i].participant_id);
      }
    }
    const newParticipantListName = [];
    for await (const [i] of participantList.entries()) {
      newParticipantListName.push(participantList[i].participant_name);
    }
    const useSchool = false;
    const result = await Competition.findAll({
      include: [
        {
          model: Member,
          require: true,
          include: {
            model: School,
            require: true,
            where: useSchool && {
              school_id: {
                [Op.eq]: schoolId,
              },
            },
          },
          where: useSchool && {
            school_id: {
              [Op.ne]: null,
            },
          },
        },
        {
          model: Participant,
          require: true,
          where: {
            [Op.and]: [
              {
                participant_id: {
                  [Op.notIn]: newParticipantListId,
                },
              },
              {
                participant_name: {
                  [Op.in]: newParticipantListName,
                },
              },
            ],
          },
        },
      ],
      where: {
        program_id: programId,
      },
    });
    if (await result.length) {
      return {
        status: false,
        data: 'ไม่สามารถสมัครเข้าร่วมได้ เนื่องจากชื่อผู้สมัครซ้ำในโปรแกรมนี้',
      };
    } else {
      return { status: true, data: null };
    }
  } catch (error) {
    return { status: false, data: error.name };
  }
};

// PUT: Update competition
router.put('/competition', async (req, res) => {
  try {
    const {
      competition_id,
      program_id,
      school_id,
      create_advisor_list,
      update_advisor_list,
      delete_advisor_list,
      create_participant_list,
      update_participant_list,
      delete_participant_list,
    } = req.body;

    // begin local check
    // merge create and update
    const advisorList = [];
    advisorList.push(...create_advisor_list, ...update_advisor_list);
    const participantList = [];
    participantList.push(...create_participant_list, ...update_participant_list);
    // wait check local advisor and participant exists
    const localAdvisorOrParticipantExists = await checkLocalAdvisorOrParticipantExists(
      advisorList,
      participantList
    );
    // alert
    if (!localAdvisorOrParticipantExists.status) {
      return res.send(localAdvisorOrParticipantExists);
    }
    // end local check

    // begin db check
    // wait check participant exists
    const participantExists = await checkUpdateParticipantExists(
      program_id,
      school_id,
      participantList
    );
    if (!participantExists.status) {
      return res.send(participantExists);
    }
    // end db check

    await multiCreateAdvisor(create_advisor_list, competition_id);
    await multiUpdateAdvisor(update_advisor_list);
    await multiDeleteAdvisor(delete_advisor_list);
    await multiCreateParticipant(create_participant_list, competition_id);
    await multiUpdateParticipant(update_participant_list);
    await multiDeleteParticipant(delete_participant_list);
    // response
    res.json({ status: true, data: null });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// DELETE: Delete competition
router.delete('/competition/:id', async (req, res) => {
  try {
    await Competition.destroy({
      where: { competition_id: req.params.id },
    });
    res.json({ status: true, data: null });
  } catch (error) {
    res.json({ error: true, data: error.name });
  }
});

// GET: GEt Participant
router.get('/participant', async (req, res) => {
  try {
    const result = await Activity.findAll({
      include: [
        {
          model: Program,
          require: true,
          include: [
            {
              model: ActivityLevel,
              require: true,
            },
            {
              model: Competition,
              require: true,
              where: {
                competition_id: {
                  [Op.ne]: null,
                },
              },
              include: {
                model: Participant,
                require: true,
              },
            },
          ],
          where: {
            program_id: {
              [Op.ne]: null,
            },
          },
        },
      ],
    });
    // response
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: GEt Participant By Admin Id
router.get('/participant/admin/:id', async (req, res) => {
  try {
    const result = await Activity.findAll({
      include: [
        {
          model: Program,
          require: true,
          include: [
            {
              model: ActivityLevel,
              require: true,
            },
            {
              model: Competition,
              require: true,
              where: {
                competition_id: {
                  [Op.ne]: null,
                },
              },
              include: [
                {
                  model: Program,
                  require: true,
                  attributes: ['limit_per_advisor', 'limit_per_team'],
                },
                {
                  model: Advisor,
                  require: true,
                },
                {
                  model: Participant,
                  require: true,
                },
              ],
            },
          ],
          where: {
            program_id: {
              [Op.ne]: null,
            },
          },
        },
      ],
      where: {
        admin_id: req.params.id,
      },
    });
    // response no seqrch
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// PUT: Update competition
router.put('/participant', async (req, res) => {
  try {
    const {
      competition_id,
      program_id,
      school_id,
      create_advisor_list,
      update_advisor_list,
      delete_advisor_list,
      create_participant_list,
      update_participant_list,
      delete_participant_list,
    } = req.body;

    // begin local check
    // merge create and update
    const advisorList = [];
    advisorList.push(...create_advisor_list, ...update_advisor_list);
    const participantList = [];
    participantList.push(...create_participant_list, ...update_participant_list);
    // wait check local advisor and participant exists
    const localAdvisorOrParticipantExists = await checkLocalAdvisorOrParticipantExists(
      advisorList,
      participantList
    );
    // alert
    if (!localAdvisorOrParticipantExists.status) {
      return res.send(localAdvisorOrParticipantExists);
    }
    // end local check

    // begin db check
    // wait check participant exists
    const participantExists = await checkUpdateParticipantExists(
      program_id,
      school_id,
      participantList
    );
    if (!participantExists.status) {
      return res.send(participantExists);
    }
    // end db check

    await multiCreateAdvisor(create_advisor_list, competition_id);
    await multiUpdateAdvisor(update_advisor_list);
    await multiDeleteAdvisor(delete_advisor_list);
    await multiCreateParticipant(create_participant_list, competition_id);
    await multiUpdateParticipant(update_participant_list);
    await multiDeleteParticipant(delete_participant_list);
    // response
    res.json({ status: true, data: null });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// DELETE: Delete Participant
router.delete('/participant/:id', async (req, res) => {
  try {
    const result = await Participant.destroy({
      where: { participant_id: req.params.id },
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// POST: Add award level
router.post('/award-level', async (req, res) => {
  try {
    const result = await AwardLevel.create(req.body);
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get award level
router.get('/award-level', async (req, res) => {
  try {
    const result = await AwardLevel.findAll();
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// PUT: Update award level
router.put('/award-level/:id', async (req, res) => {
  try {
    const result = await AwardLevel.update(req.body, {
      where: { award_level_id: req.params.id },
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

//Delete : Delete award level
router.delete('/award-level/:id', async (req, res) => {
  try {
    const result = await AwardLevel.destroy({ where: { award_level_id: req.params.id } });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// POST: Add Competition Result
router.post('/competition-result', async (req, res) => {
  try {
    try {
      const maxFileSize = 10 * 1024 * 1024; // 10MB
      const form = new formidable.IncomingForm({ maxFileSize: maxFileSize });
      form.parse(req, async (error, fields, files) => {
        // if image empty!
        if (!Object.keys(files).length) {
          // wait create
          await CompetitionResult.create(fields);
          res.json({ status: true, data: null });
        } else {
          // if error max file size
          if (error) {
            res.json({ status: false, data: `ขนาดไฟล์สูงสุด ${maxFileSize}` });
          } else {
            // upload image
            const upload = await uploadFile.image(files.proof_of_payment);
            if (upload.status) {
              fields.proof_of_payment = upload.data;
              // wait create
              await CompetitionResult.create(fields);
              res.json({ status: true, data: null });
            } else {
              res.json({ status: false, data: upload.data });
            }
          }
        }
      });
    } catch (error) {
      res.json({ status: false, data: error.name });
    }
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Competition Result
router.get('/competition-result', async (req, res) => {
  try {
    const { activity, activity_level } = req.query;
    const result = await Program.findAll({
      include: [
        {
          model: Activity,
          require: true,
        },
        {
          model: ActivityLevel,
          require: true,
        },
        {
          model: Competition,
          require: true,
          include: [
            {
              model: CompetitionResult,
              require: true,
              include: {
                model: AwardLevel,
                require: true,
              },
            },
            {
              model: Member,
              require: true,
              include: {
                model: School,
                require: true,
              },
            },
            {
              model: Participant,
              require: true,
            },
          ],
          where: {
            competition_id: {
              [Op.ne]: null,
            },
          },
        },
      ],
      where: {
        [Op.and]: [
          activity && {
            activity_id: {
              [Op.eq]: activity,
            },
          },
          activity_level && {
            activity_level_id: {
              [Op.eq]: activity_level,
            },
          },
        ],
      },
      order: [[Competition, CompetitionResult, 'award_level_id', 'ASC']],
    });
    // response
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Competition Result By Admin Id
router.get('/competition-result/admin/:id', async (req, res) => {
  try {
    const { activity, activity_level } = req.query;
    const result = await Program.findAll({
      include: [
        {
          model: Activity,
          require: true,
          where: {
            admin_id: req.params.id,
          },
        },
        {
          model: ActivityLevel,
          require: true,
        },
        {
          model: Competition,
          require: true,
          include: [
            {
              model: CompetitionResult,
              require: true,
              include: {
                model: AwardLevel,
                require: true,
              },
            },
            {
              model: Member,
              require: true,
              include: {
                model: School,
                require: true,
              },
            },
            {
              model: Program,
              require: true,
            },
            {
              model: Participant,
              require: true,
            },
          ],
          where: {
            competition_id: {
              [Op.ne]: null,
            },
          },
        },
      ],
      where: {
        [Op.and]: [
          activity && {
            activity_id: {
              [Op.eq]: activity,
            },
          },
          activity_level && {
            activity_level_id: {
              [Op.eq]: activity_level,
            },
          },
        ],
      },
      order: [[Competition, CompetitionResult, 'award_level_id', 'ASC']],
    });
    // response
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Competition Result By Member Id
router.get('/competition-result/member/:id', async (req, res) => {
  try {
    const result = await Activity.findAll({
      include: [
        {
          model: Program,
          require: true,
          include: [
            {
              model: Activity,
              require: true,
              attributes: ['activity_type'],
            },
            {
              model: ActivityLevel,
              require: true,
            },
            {
              model: Competition,
              require: true,
              where: {
                competition_id: {
                  [Op.ne]: null,
                },
                member_id: {
                  [Op.eq]: req.params.id,
                },
              },
              include: [
                {
                  model: Program,
                  require: true,
                  include: [
                    {
                      model: Activity,
                      require: true,
                      attributes: ['activity_name', 'activity_type'],
                    },
                    {
                      model: ActivityLevel,
                      require: true,
                      attributes: ['name'],
                    },
                  ],
                },
                {
                  model: CompetitionResult,
                  require: true,
                  include: {
                    model: AwardLevel,
                    require: true,
                  },
                },
                {
                  model: Advisor,
                  require: true,
                },
                {
                  model: Participant,
                  require: true,
                },
              ],
            },
          ],
          where: {
            program_id: {
              [Op.ne]: null,
            },
          },
        },
      ],
    });
    // response
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Competition Result By Overview
router.get('/competition-result/overview', async (req, res) => {
  try {
    const { activity, activity_level } = req.query;
    const result = await Activity.findAll({
      include: [
        {
          model: Program,
          require: true,
          include: [
            {
              model: Activity,
              require: true,
              attributes: ['activity_type'],
            },
            {
              model: ActivityLevel,
              require: true,
            },
            {
              model: Competition,
              require: true,
              where: {
                competition_id: {
                  [Op.ne]: null,
                },
              },
              include: [
                {
                  model: CompetitionResult,
                  require: true,
                  include: {
                    model: AwardLevel,
                    require: true,
                  },
                },
                {
                  model: Program,
                  require: true,
                  include: [
                    {
                      model: Activity,
                      require: true,
                      attributes: ['activity_name', 'activity_type'],
                    },
                    {
                      model: ActivityLevel,
                      require: true,
                      attributes: ['name'],
                    },
                  ],
                },
                {
                  model: Advisor,
                  require: true,
                },
                {
                  model: Participant,
                  require: true,
                },
              ],
            },
          ],
          where: {
            [Op.and]: [
              {
                program_id: {
                  [Op.ne]: null,
                },
              },
              activity && {
                activity_id: {
                  [Op.eq]: activity,
                },
              },
              activity_level && {
                activity_level_id: {
                  [Op.eq]: activity_level,
                },
              },
            ],
          },
        },
      ],
      order: [[Program, Competition, CompetitionResult, 'award_level_id', 'ASC']],
    });
    // response
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Competition Result With Proof Of Payment
router.get('/competition-result/proof-of-payment', async (req, res) => {
  try {
    const { search, activity, activity_level } = req.query;
    // query
    const result = await Program.findAll({
      include: [
        {
          model: Competition,
          require: true,
          include: [
            {
              model: CompetitionResult,
              require: true,
              include: {
                model: AwardLevel,
                require: true,
              },
              where: {
                [Op.and]: [
                  {
                    competition_result_id: {
                      [Op.ne]: null,
                    },
                  },
                  {
                    amount: {
                      [Op.like]: `%${search ? search : ''}%`,
                    },
                  },
                ],
              },
            },
            {
              model: Member,
              require: true,
            },
            {
              model: Participant,
              require: true,
            },
          ],
          where: {
            competition_id: {
              [Op.ne]: null,
            },
          },
        },
      ],
      where: {
        [Op.and]: [
          activity && {
            activity_id: {
              [Op.eq]: activity,
            },
          },
          activity_level && {
            activity_level_id: {
              [Op.eq]: activity_level,
            },
          },
        ],
      },
    });
    // response
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Competition By Member Id
router.get('/competition/member/:id', async (req, res) => {
  try {
    const search = req.query.search;
    const result = await Activity.findAll({
      include: [
        {
          model: Program,
          require: true,
          include: [
            {
              model: Activity,
              require: true,
              attributes: ['activity_id', 'activity_type'],
            },
            {
              model: ActivityLevel,
              require: true,
            },
            {
              model: Coordinator,
              require: true,
            },
            {
              model: Documents,
              require: true,
            },
            {
              model: Links,
              require: true,
            },
            {
              model: Competition,
              require: true,
              where: {
                competition_id: {
                  [Op.ne]: null,
                },
                member_id: {
                  [Op.eq]: req.params.id,
                },
              },
              include: [
                {
                  model: Program,
                  require: true,
                  include: [
                    {
                      model: Activity,
                      require: true,
                      attributes: ['activity_name', 'activity_type'],
                    },
                    {
                      model: ActivityLevel,
                      require: true,
                      attributes: ['name'],
                    },
                  ],
                },
                {
                  model: Advisor,
                  require: true,
                },
                {
                  model: Participant,
                  require: true,
                },
              ],
            },
          ],
          where: {
            program_id: {
              [Op.ne]: null,
            },
          },
        },
      ],
      where: search && {
        [Op.or]: [
          {
            activity_name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            '$programs.activity_level.level_type$': {
              [Op.like]: `%${search}%`,
            },
          },
          {
            '$programs.activity_level.activity_level_name$': {
              [Op.like]: `%${search}%`,
            },
          },
          {
            '$programs.competitions.advisors.advisor_name$': {
              [Op.like]: `%${search}%`,
            },
          },
          {
            '$programs.competitions.participants.participant_name$': {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
    });
    // response
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Competition Result Check
router.get('/competition-result/check', async (req, res) => {
  try {
    const result = await Activity.findAll({
      include: [
        {
          model: Program,
          require: true,
          include: [
            {
              model: ActivityLevel,
              require: true,
            },
            {
              model: Competition,
              require: true,
              where: {
                competition_id: {
                  [Op.ne]: null,
                },
              },
            },
          ],
          where: {
            program_id: {
              [Op.ne]: null,
            },
          },
        },
      ],
      order: [
        ['activity_id', 'ASC'],
        [Program, 'activity_level_id', 'ASC'],
      ],
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// Multi Create Competition Result
const multiCreateCompetitionResult = async (competitionResultList) => {
  if (competitionResultList.length) {
    // multi create
    for (const [i] of competitionResultList.entries()) {
      await CompetitionResult.create({
        program_id: competitionResultList[i].program_id,
        competition_id: competitionResultList[i].competition_id,
        award_level_id: competitionResultList[i].award_level_id,
      });
    }
    return { status: true };
  } else {
    return { status: true };
  }
};

// Multi Update Competition Result
const multiUpdateCompetitionResult = async (competitionResultList) => {
  if (competitionResultList.length) {
    // multi update
    for (const [i] of competitionResultList.entries()) {
      await CompetitionResult.update(
        { award_level_id: competitionResultList[i].award_level_id },
        {
          where: {
            competition_result_id: competitionResultList[i].competition_result_id,
          },
        }
      );
    }
    return { status: true };
  } else {
    return { status: true };
  }
};

// Multi Confirm Competition Result
const multiConfirmCompetitonResult = async (confirm, programList) => {
  if (confirm) {
    for (const [i] of programList.entries()) {
      await Program.update(
        { confirm: true },
        {
          where: { program_id: programList[i].program_id },
        }
      );
    }
    return { status: true };
  } else {
    return { status: true };
  }
};

// PUT: Update Competition Result
router.put('/competition-result', async (req, res) => {
  try {
    const {
      program_list,
      confirm,
      competition_result_create_list,
      competition_result_update_list,
    } = req.body;
    if (
      program_list ||
      confirm ||
      competition_result_create_list ||
      competition_result_update_list
    ) {
      // wait create competition result
      await multiCreateCompetitionResult(competition_result_create_list);
      // wait update competition result
      await multiUpdateCompetitionResult(competition_result_update_list);
      // wait check available confirm program
      await multiConfirmCompetitonResult(confirm, program_list);
      // response
      res.json({ status: true, data: null });
    } else {
      // update amount and proof of payment
      const maxFileSize = 10 * 1024 * 1024; // 10MB
      const form = new formidable.IncomingForm({ maxFileSize: maxFileSize });
      form.parse(req, async (error, fields, files) => {
        // if image empty!
        if (!Object.keys(files).length) {
          // wait update
          const result = await CompetitionResult.update(fields, {
            where: { competition_result_id: fields.competition_result_id },
          });
          res.json({ status: true, data: result });
        } else {
          // if error max file size
          if (error) {
            res.json({ status: false, data: `ขนาดไฟล์สูงสุด ${maxFileSize}` });
          } else {
            // upload image
            const upload = await uploadFile.image(files.proof_of_payment);
            if (upload.status) {
              fields.proof_of_payment = upload.data;
              // wait update
              const result = await CompetitionResult.update(fields, {
                where: { competition_result_id: fields.competition_result_id },
              });
              res.json({ status: true, data: result });
            } else {
              res.json({ status: false, data: upload.data });
            }
          }
        }
      });
    }
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// Multi UpdateCheck Competition Result
const multiUpdateCheckCompetitionResult = async (programList) => {
  if (programList.length) {
    for (const [i] of programList.entries()) {
      await Program.update(
        { confirm: false },
        {
          where: { program_id: programList[i].program_id },
        }
      );
    }
    return { status: true };
  } else {
    return { status: true };
  }
};

// PUT: Update Check Competition Result
router.put('/competition-result/check', async (req, res) => {
  try {
    const { activity_id, activity_level_id } = req.body;
    // get program
    const program = await Program.findAll({
      where: {
        [Op.and]: [
          {
            activity_id: {
              [Op.eq]: activity_id,
            },
          },
          {
            activity_level_id: {
              [Op.eq]: activity_level_id,
            },
          },
        ],
      },
    });
    // wait update check competition result
    await multiUpdateCheckCompetitionResult(program);
    res.json({ status: true, data: null });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

module.exports = router;
