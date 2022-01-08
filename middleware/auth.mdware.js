import users_model from "../models/users_model.js";  
export default async function auth(req, res, next) {
    if (req.session.auth === false) {
      req.session.retUrl = req.originalUrl;
      return res.redirect('/auth');
    }

    const role = await users_model.getRole(req.session.authUser.ID);
    if (req.session.authUser.Role != role[0].Role){
      console.log(req.session.authUser.Role)
      console.log(role[0].Role)
      return res.redirect('/auth')
    }
    if (req.baseUrl ==='/admin'){
      if(req.session.authUser.Role != 2){
        return res.redirect('/')
      }
    }
    next();
  }