import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from 'hoc/sessionOptions';

export default withIronSessionApiRoute(async (req, res) => {
  try {
    req.session.destroy();
    res.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}, sessionOptions);

