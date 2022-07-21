const express = require('express');
const router = express.Router();
const { Op, Sequelize, QueryTypes } = require('sequelize');
const fs = require('fs');
const Activity = require('../models/activity_model');
const ActivityLevel = require('../models/activty_level_model');
const Program = require('../models/program_model');
const Coordinator = require('../models/coordinator_model');
const Documents = require('../models/documents_model');
const Links = require('../models/links_model');
const formidable = require('formidable');
const uploadFile = require('../utils/upload_file');
const Competition = require('../models/competition_model');

// Check Program Alreday Exists
const checkProgramAlredayExists = async (fields) => {
  try {
    const result = await Program.findOne({
      where: {
        activity_id: fields.activity_id,
        activity_level_id: fields.activity_level_id,
      },
    });
    if (result) {
      return { status: false, data: 'ไม่สามารถเพิ่มโปรแกรมซ้ำ' };
    } else {
      return { status: true, data: null };
    }
  } catch (error) {
    return { status: false, data: error.name };
  }
};

// Multi Create Coordinator
const multiCreateCoordinator = async (fields, programId) => {
  try {
    if (!fields.coordinator_name) return;
    // one upload
    if (typeof fields.coordinator_name === 'string') {
      await Coordinator.create({
        program_id: programId,
        coordinator_name: fields.coordinator_name,
      });
      return { status: true };
    } else if (typeof fields.coordinator_name === 'object') {
      // multi upload
      for (const [i] of fields.coordinator_name.entries()) {
        await Coordinator.create({
          program_id: programId,
          coordinator_name: fields.coordinator_name[i],
        });
      }
      return { status: true };
    } else {
      return { status: true };
    }
  } catch (error) {
    return { status: true, data: error.name };
  }
};

// Multi Create Document
const multiCreateDocument = async (fields, files, programId) => {
  if (!fields.document_name && !fields.document_src) return;
  // one upload
  if (typeof fields.document_name === 'string') {
    // upload file
    const upload = await uploadFile.document(files.document_src);
    if (upload.status) {
      const newPath = upload.data;
      await Documents.create({
        program_id: programId,
        document_name: fields.document_name,
        document_src: newPath,
      });
    }
    return { status: true };
  } else if (typeof fields.document_name === 'object') {
    // multi upload
    for (const [i] of fields.document_name.entries()) {
      // upload file
      const upload = await uploadFile.document(files.document_src[i]);
      if (upload.status) {
        const newPath = upload.data;
        await Documents.create({
          program_id: programId,
          document_name: fields.document_name[i],
          document_src: newPath,
        });
      }
    }
    return { status: true };
  } else {
    return { status: true };
  }
};

// Multi Create Link
const multiCreateLink = async (fields, programId) => {
  if (!fields.link_name && !fields.link_src) return;
  // one upload
  if (typeof fields.link_name === 'string') {
    await Links.create({
      program_id: programId,
      link_name: fields.link_name,
      link_src: fields.link_src,
    });
    return { status: true };
  } else if (typeof fields.link_name === 'object') {
    // multi upload
    for (const [i] of fields.link_name.entries()) {
      await Links.create({
        program_id: programId,
        link_name: fields.link_name[i],
        link_src: fields.link_src[i],
      });
    }
    return { status: true };
  } else {
    return { status: true };
  }
};

// POST: Add Program
router.post('/program', async (req, res) => {
  try {
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const form = new formidable.IncomingForm({ maxFileSize: maxFileSize, multiples: true });
    form.parse(req, async (error, fields, files) => {
      // check program alreday exists
      const programExists = await checkProgramAlredayExists(fields);
      if (programExists.status) {
        // wait create program
        const createProgramResult = await Program.create({
          admin_id: fields.admin_id,
          activity_id: fields.activity_id,
          activity_level_id: fields.activity_level_id,
          limit_per_advisor: fields.limit_per_advisor,
          limit_per_team: fields.limit_per_team,
          limit_per_school: fields.limit_per_school,
          limit_per_program: fields.limit_per_program,
          apply_from: fields.apply_from,
          apply_to: fields.apply_to,
          start_date: fields.start_date,
          result_date: fields.result_date,
          location: fields.location,
          confirm: fields.confirm,
        });
        // get program id
        const programId = await createProgramResult?.program_id;
        // wait create coordinator
        await multiCreateCoordinator(fields, programId);
        // wait create document
        await multiCreateDocument(fields, files, programId);
        // wait create link
        await multiCreateLink(fields, programId);
        // res
        res.json({ status: true, data: null });
      } else {
        res.json(programExists);
      }
    });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Program
router.get('/program', async (req, res) => {
  try {
    const result = await Activity.findAll({
      include: [
        {
          model: Program,
          require: true,
          where: {
            program_id: {
              [Op.ne]: null,
            },
          },
          include: [
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
          ],
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

// GET: Get Program By Id
router.get('/program/:id', async (req, res) => {
  try {
    const result = await Program.findOne({
      include: [
        {
          model: Activity,
          require: true,
        },
        {
          model: ActivityLevel,
          requireL: true,
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
      ],
      where: {
        program_id: {
          [Op.eq]: req.params.id,
        },
      },
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Program By Admin Id
router.get('/program/admin/:id', async (req, res) => {
  try {
    const search = req.query.search;
    const result = await Activity.findAll({
      include: [
        {
          model: Program,
          require: true,
          where: {
            program_id: {
              [Op.ne]: null,
            },
          },
          include: [
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
          ],
        },
      ],
      where: {
        [Op.and]: [
          {
            admin_id: {
              [Op.eq]: req.params.id,
            },
          },
          {
            activity_name: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
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

// GET: Get Program Detail By Activity id
router.get('/program-detail', async (req, res) => {
  try {
    const activityId = req.query.activity;
    const userId = req.query.user;

    // show on public
    if (!userId) {
      const result = await Activity.findOne({
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
            ],
          },
        ],
        where: {
          activity_id: activityId,
        },
        order: [
          ['activity_id', 'ASC'],
          [Program, 'activity_level_id', 'ASC'],
        ],
      });
      return res.json({ status: true, data: result, joined: [] });
    }

    // query with admin
    if (userId == -1) {
      const programs = await Program.findAll({
        where: {
          activity_id: activityId,
        },
      });
      const parseProgram = await JSON.parse(JSON.stringify(programs));
      const joinedProgram = [];
      for (const [i] of parseProgram.entries()) {
        if (parseProgram.length) {
          joinedProgram.push(true);
        }
      }
      const result = await Activity.findOne({
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
            ],
          },
        ],
        where: {
          activity_id: activityId,
        },
        order: [
          ['activity_id', 'ASC'],
          [Program, 'activity_level_id', 'ASC'],
        ],
      });
      return res.json({ status: true, data: result, joined: joinedProgram });
    }

    // query with member
    if (userId) {
      const programs = await Program.findAll({
        where: {
          activity_id: activityId,
        },
      });
      const parseProgram = await JSON.parse(JSON.stringify(programs));
      const joinedProgram = [];
      for (const [i] of parseProgram.entries()) {
        if (parseProgram.length) {
          const find = await Activity.findOne({
            include: [
              {
                model: Program,
                require: true,
                where: {
                  program_id: {
                    [Op.eq]: parseProgram[i].program_id,
                  },
                },
                include: [
                  {
                    model: Competition,
                    require: false,
                    where: {
                      member_id: {
                        [Op.eq]: userId,
                      },
                    },
                  },
                ],
              },
            ],
            where: {
              activity_id: activityId,
            },
            order: [
              ['activity_id', 'ASC'],
              [Program, 'activity_level_id', 'ASC'],
            ],
          });
          joinedProgram.push((await find) ? true : false);
        }
      }
      const result = await Activity.findOne({
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
            ],
          },
        ],
        where: {
          activity_id: activityId,
        },
        order: [
          ['activity_id', 'ASC'],
          [Program, 'activity_level_id', 'ASC'],
        ],
      });
      return res.json({ status: true, data: result, joined: joinedProgram });
    }
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Program By Activity Id
router.get('/program/activity/:id', async (req, res) => {
  try {
    const result = await Activity.findAll({
      include: [
        {
          model: Program,
          require: true,
          where: {
            program_id: req.params.id,
          },
          include: {
            model: ActivityLevel,
            require: true,
          },
        },
      ],
      order: [[['activity_id', 'ASC']], [Program, 'activity_level_id', 'ASC']],
    });
    res.json({ status: true, data: result[0] });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// Multi Delete Coordinator
const multiDeleteCoordinator = async (fields) => {
  if (!fields.delete_coordinator_id) return;
  // one delete
  if (typeof fields.delete_coordinator_id === 'string') {
    await Coordinator.destroy({
      where: { coordinator_id: fields.delete_coordinator_id },
    });
    return { status: true };
  } else if (typeof fields.delete_coordinator_id === 'object') {
    // multi delete
    for (const [i] of fields.delete_coordinator_id.entries()) {
      await Coordinator.destroy({
        where: { coordinator_id: fields.delete_coordinator_id[i] },
      });
    }
    return { status: true };
  } else {
    return { status: true };
  }
};

// Multi Delete Document
const multiDeleteDocument = async (fields) => {
  if (!fields.delete_document_id) return;
  // one delete
  if (typeof fields.delete_coordinator_id === 'string') {
    await Documents.destroy({
      where: { document_id: fields.delete_document_id },
    });
    return { status: true };
  } else if (typeof fields.delete_document_id === 'object') {
    // multi delete
    for (const [i] of fields.delete_document_id.entries()) {
      await Documents.destroy({
        where: { document_id: fields.delete_document_id[i] },
      });
    }
    return { status: true };
  } else {
    return { status: true };
  }
};

// Multi Delete Link
const multiDeleteLink = async (fields) => {
  if (!fields.delete_link_id) return;
  // one delete
  if (typeof fields.delete_link_id === 'string') {
    await Links.destroy({
      where: { link_id: fields.delete_link_id },
    });
    return { status: true };
  } else if (typeof fields.delete_link_id === 'object') {
    // multi delete
    for (const [i] of fields.delete_link_id.entries()) {
      await Links.destroy({
        where: { link_id: fields.delete_link_id[i] },
      });
    }
    return { status: true };
  } else {
    return { status: true };
  }
};

// PUT: Update Program By Id
router.put('/program/:id', async (req, res) => {
  try {
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const form = new formidable.IncomingForm({ maxFileSize: maxFileSize, multiples: true });
    form.parse(req, async (error, fields, files) => {
      const programId = req.params.id;
      // wait update program
      await Program.update(
        {
          admin_id: fields.admin_id,
          activity_id: fields.activity_id,
          activity_level_id: fields.activity_level_id,
          limit_per_advisor: fields.limit_per_advisor,
          limit_per_team: fields.limit_per_team,
          limit_per_school: fields.limit_per_school,
          limit_per_program: fields.limit_per_program,
          apply_from: fields.apply_from,
          apply_to: fields.apply_to,
          start_date: fields.start_date,
          result_date: fields.result_date,
          location: fields.location,
          confirm: fields.confirm,
        },
        {
          where: { program_id: programId },
        }
      );

      // wait create coordinator
      await multiCreateCoordinator(fields, programId);
      // wait delete coordinator
      await multiDeleteCoordinator(fields);
      // wait create document
      await multiCreateDocument(fields, files, programId);
      // wait delete document
      await multiDeleteDocument(fields);
      // wait create link
      await multiCreateLink(fields, programId);
      // wait delete link
      await multiDeleteLink(fields, programId);
      // res
      res.json({ status: true, data: null });
    });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// DELETE: Program By Id
router.delete('/program/:id', async (req, res) => {
  try {
    await Program.destroy({
      where: { program_id: req.params.id },
    });
    res.json({ status: true, data: null });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

module.exports = router;
