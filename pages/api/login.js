import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from 'hoc/sessionOptions';

const setUser = (id, level, type) => {
  if (type === 'member') {
    return { auth0: true, id: id };
  } else if (type === 'admin') {
    if (level === 1) {
      return { auth1: true, id: id };
    } else if (level === 2) {
      return { auth2: true, id: id };
    } else if (level === 3) {
      return { auth3: true, id: id };
    } else if (level === 4) {
      return { auth4: true, id: id };
    } else if (level === 5) {
      return { auth5: true, id: id };
    }
  }
  return;
};

export default withIronSessionApiRoute(async (req, res) => {
  try {
    // new func
    const { id, level, type } = await req.body;
    const user = setUser(id, level, type);
    // save session
    req.session.user = user;
    await req.session.save();
    // response
    res.json({ status: true });

    // old func
    // const { id, level, type } = await req.body;
    // const user = { auth: true, id: id, level: type === 'admin' ? level : null };
    // req.session.user = user;
    // // save session
    // await req.session.save();
    // // response
    // res.json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}, sessionOptions);
