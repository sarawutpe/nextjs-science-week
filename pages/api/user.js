import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from 'hoc/sessionOptions';

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req, res) {
  if (req.session.user) {
    res.json({ ...req.session.user, isLoggedIn: true });
  } else {
    res.json({ auth: null, id: null, isLoggedIn: false });
  }
}
