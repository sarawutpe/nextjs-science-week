const express = require('express');
const app = express();
const cors = require('cors');
const serveIndex = require('serve-index');
require('dotenv').config();

// config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));

// debug mode
app.use('/uploads', serveIndex(__dirname+'/uploads', {icons: true}));

// api routes
app.use('/api/v1/test', require('./routes/test_api'));
app.use('/api/v1/auth', require('./routes/auth_api'));
app.use('/api/v1/account-management', require('./routes/account_api'));
app.use('/api/v1/school-management', require('./routes/school_api'));
app.use('/api/v1/activity-management', require('./routes/activity_api'));
app.use('/api/v1/program-management', require('./routes/program_api'));
app.use('/api/v1/competition-management', require('./routes/competition_api'));
app.use('/api/v1/news-management', require('./routes/news_api'));
app.use('/api/v1/certificate-management', require('./routes/certificate_api'));
app.use('/api/v1/site-management', require('./routes/site_api'));
app.use('/api/v1/form-management', require('./routes/form_api'));
app.use('/api/v1/report', require('./routes/report_api'));
app.use('/api/v1/email', require('./routes/email_api'));

// set timezone
process.env.TZ = 'Asia/Bangkok';

// port
const PORT = process.env.PORT || 8085

app.listen(PORT, () => {
  console.log('Server is running...');
});
