const express = require('express');
const router = express.Router();
const { Op, Sequelize, QueryTypes, where } = require('sequelize');
const Activity = require('../models/activity_model');
const ActivityLevel = require('../models/activty_level_model');
const Program = require('../models/program_model');
const Competition = require('../models/competition_model');
const Advisor = require('../models/advisor_model');
const Participant = require('../models/participant_model');
const AwardLevel = require('../models/award_level_model');
const CompetitionResult = require('../models/competition_results_model');
const Member = require('../models/member_model');
const School = require('../models/school_model');

// GET: Get Report Competition
router.get('/competition', async (req, res) => {
  try {
    const countTeam = await Competition.count();
    const countParticipant = await Participant.count();
    const countAdvisor = await Advisor.count();
    const result = await Activity.findAndCountAll({
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
    res.json({
      status: true,
      data: {
        count_team: countTeam,
        count_participant: countParticipant,
        count_advisor: countAdvisor,
        rows: result.rows,
      },
    });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Report Competition By Program Id
router.get('/competition/:id', async (req, res) => {
  try {
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
              model: Advisor,
              require: true,
            },
            {
              model: Participant,
              require: true,
            },
          ],
          where: {
            program_id: {
              [Op.eq]: req.params.id,
            },
          },
        },
      ],
      order: [[Competition, CompetitionResult, 'award_level_id', 'ASC']],
    });
    // response
    res.json({ status: true, data: result[0] });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Report Competition Result
router.get('/competition-result', async (req, res) => {
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
                  model: Advisor,
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
            program_id: {
              [Op.ne]: null,
            },
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

// GET: Get Report Competition Award
router.get('/competition-award', async (req, res) => {
  try {
    // count team
    const countTeam = await Activity.findAll({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('competition_result_id')), 'count'],
      ],
      include: {
        model: Program,
        require: true,
        include: {
          model: CompetitionResult,
          require: true,
        },
      },
    });
    const countCompetitionAward = await CompetitionResult.count({
      where: { amount: { [Op.ne]: null }, proof_of_payment: { [Op.ne]: '' } },
    });
    const sumCompetitionPayment = await CompetitionResult.sum('amount', {
      where: { amount: { [Op.ne]: null }, proof_of_payment: { [Op.ne]: '' } },
    });
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
                  model: CompetitionResult,
                  require: true,
                  where: {
                    [Op.and]: [
                      {
                        competition_result_id: {
                          [Op.ne]: null,
                        },
                      },
                      {
                        amount: {
                          [Op.ne]: null,
                        },
                      },
                      {
                        proof_of_payment: {
                          [Op.ne]: '',
                        },
                      },
                    ],
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
    res.json({
      status: true,
      data: {
        count_team: countTeam[0]?.dataValues?.count,
        count_competition_award: countCompetitionAward,
        sum_competition_payment: sumCompetitionPayment,
        rows: result,
      },
    });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Report Competition Award By Admin Id
router.get('/competition-award/admin/:id', async (req, res) => {
  try {
    // count team
    const countTeam = await Activity.findAll({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('competition_result_id')), 'count'],
      ],
      include: {
        model: Program,
        require: true,
        include: {
          model: CompetitionResult,
          require: true,
        },
      },
      where: {
        admin_id: req.params.id,
      },
    });
    // count team with payment
    const countTeamWithPayment = await Activity.findAll({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('competition_result_id')), 'count'],
      ],
      include: {
        model: Program,
        require: true,
        include: {
          model: CompetitionResult,
          require: true,
          where: { amount: { [Op.ne]: null }, proof_of_payment: { [Op.ne]: '' } },
        },
      },
      where: {
        admin_id: req.params.id,
      },
    });
    // result
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
                  model: CompetitionResult,
                  require: true,
                  where: {
                    [Op.and]: [
                      {
                        competition_result_id: {
                          [Op.ne]: null,
                        },
                      },
                      {
                        amount: {
                          [Op.ne]: null,
                        },
                      },
                      {
                        proof_of_payment: {
                          [Op.ne]: '',
                        },
                      },
                    ],
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
        admin_id: {
          [Op.eq]: req.params.id,
        },
      },
    });
    // response
    res.json({
      status: true,
      data: {
        count_team: countTeam[0]?.dataValues?.count,
        colunt_team_with_payment: countTeamWithPayment[0]?.dataValues?.count,
        rows: result,
      },
    });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Report Participant
router.get('/participant', async (req, res) => {
  try {
    const countAllParticipant = await Participant.count();
    const result = await Activity.findAndCountAll({
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
                  model: Advisor,
                  require: true,
                },
                {
                  model: Participant,
                  require: true,
                  where: {
                    participant_active: true,
                  },
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
    res.json({
      status: true,
      data: {
        count_all: countAllParticipant,
        count: result.count,
        rows: result.rows,
      },
    });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Report Participant By Admin Id
router.get('/participant/admin/:id', async (req, res) => {
  try {
    // count all participnat by admin id
    const countAllParticipant = await Activity.findAll({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('participant_id')), 'count']],
      include: {
        model: Program,
        require: true,
        include: {
          model: Competition,
          require: true,
          include: {
            model: Participant,
            require: true,
            where: {
              participant_id: {
                [Op.ne]: null,
              },
            },
          },
        },
      },
      where: {
        admin_id: req.params.id,
      },
    });
    // count participnat active by admin id
    const countParticipantActive = await Activity.findAll({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('participant_id')), 'count']],
      include: {
        model: Program,
        require: true,
        include: {
          model: Competition,
          require: true,
          include: {
            model: Participant,
            require: true,
            where: {
              [Op.and]: [
                {
                  participant_id: {
                    [Op.ne]: null,
                  },
                },
                {
                  participant_active: {
                    [Op.eq]: true,
                  },
                },
              ],
            },
          },
        },
      },
      where: {
        admin_id: req.params.id,
      },
    });
    // result
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
                  model: Advisor,
                  require: true,
                },
                {
                  model: Participant,
                  require: true,
                  where: {
                    participant_active: true,
                  },
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
        admin_id: {
          [Op.eq]: req.params.id,
        },
      },
    });
    // response
    res.json({
      status: true,
      data: {
        count_all: countAllParticipant[0]?.dataValues?.count,
        count: countParticipantActive[0]?.dataValues?.count,
        rows: result,
      },
    });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

module.exports = router;
